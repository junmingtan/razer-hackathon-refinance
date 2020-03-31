package proj2

// CS 161 Project 2 Spring 2020
// You MUST NOT change what you import.  If you add ANY additional
// imports it will break the autograder. We will be very upset.

import (
	// You neet to add with
	// go get github.com/cs161-staff/userlib

	"github.com/cs161-staff/userlib"

	// Life is much easier with json:  You are
	// going to want to use this so you can easily
	// turn complex structures into strings etc...
	"encoding/json"

	// Likewise useful for debugging, etc...
	"encoding/hex"

	// UUIDs are generated right based on the cryptographic PRNG
	// so lets make life easier and use those too...
	//
	// You need to add with "go get github.com/google/uuid"
	"github.com/google/uuid"

	// Useful for debug messages, or string manipulation for datastore keys.
	"strings"

	// Want to import errors.
	"errors"

	// Optional. You can remove the "_" there, but please do not touch
	// anything else within the import bracket.
	_ "strconv"
	// if you are looking for fmt, we don't give you fmt, but you can use userlib.DebugMsg.
	// see someUsefulThings() below:
)

// This serves two purposes:
// a) It shows you some useful primitives, and
// b) it suppresses warnings for items not being imported.
// Of course, this function can be deleted.
func someUsefulThings() {
	// Creates a random UUID
	f := uuid.New()
	userlib.DebugMsg("UUID as string:%v", f.String())

	// Example of writing over a byte of f
	f[0] = 10
	userlib.DebugMsg("UUID as string:%v", f.String())

	// takes a sequence of bytes and renders as hex
	h := hex.EncodeToString([]byte("fubar"))
	userlib.DebugMsg("The hex: %v", h)

	// Marshals data into a JSON representation
	// Will actually work with go structures as well
	d, _ := json.Marshal(f)
	userlib.DebugMsg("The json data: %v", string(d))
	var g uuid.UUID
	json.Unmarshal(d, &g)
	userlib.DebugMsg("Unmashaled data %v", g.String())

	// This creates an error type
	userlib.DebugMsg("Creation of error %v", errors.New(strings.ToTitle("This is an error")))

	// And a random RSA key.  In this case, ignoring the error
	// return value
	var pk userlib.PKEEncKey
	var sk userlib.PKEDecKey
	pk, sk, _ = userlib.PKEKeyGen()
	userlib.DebugMsg("Key is %v, %v", pk, sk)
}

// Helper function: Takes the first 16 bytes and
// converts it into the UUID type
func bytesToUUID(data []byte) (ret uuid.UUID) {
	for x := range ret {
		ret[x] = data[x]
	}
	return
}

// The structure definition for a user record
// PKEDecKey : private key for encyption
// Sign : Private key for signitures
type User struct {
	Username  string
	Password  string
	PKEDecKey userlib.PrivateKeyType
	DSSignKey userlib.PrivateKeyType

	// You can add other fields here if you want...
	// Note for JSON to marshal/unmarshal, the fields need to
	// be public (start with a capital letter)
}

type Storage struct {
	Enc  []byte
	HMAC []byte
}

type Tree struct {
	Username string
	Children []Tree
}

type FileHeaderContents struct {
	Users            Tree
	File_data        []uuid.UUID
	Last_known_nonce []byte
	Nonce_signiture  []byte
}

type AccessToken struct {
	OwnerUsername    string
	SenderUsername   string
	NonceUUID        uuid.UUID
	FileHeaderUUID   uuid.UUID
	NonceKey         []byte
	FileKey          []byte
	FileKeySigniture []byte
}

type AccessTokenRetriever struct {
	AccessTokenUUID uuid.UUID
	AccessTokenKey  []byte
}

// This creates a user.  It will only be called once for a user
// (unless the keystore and datastore are cleared during testing purposes)

// It should store a copy of the userdata, suitably encrypted, in the
// datastore and should store the user's public key in the keystore.

// The datastore may corrupt or completely erase the stored
// information, but nobody outside should be able to get at the stored

// You are not allowed to use any global storage other than the
// keystore and the datastore functions in the userlib library.

// You can assume the password has strong entropy, EXCEPT
// the attackers may possess a precomputed tables containing
// hashes of common passwords downloaded from the internet.
func storeAccessToken(accessTokenEnc []byte) (accessTokenEncStore []byte) {
	var store Storage
	store.Enc = accessTokenEnc
	accessTokenEncStore, _ = json.Marshal(store)
	return accessTokenEncStore
}
func retreiveAccessToken(accessTokenEncStore []byte) (accessTokenEnc []byte, err error) {

	var store Storage
	_ = json.Unmarshal(accessTokenEncStore, &store)
	if store.Enc == nil {
		return accessTokenEnc, errors.New("Encryption is corrupted")
	}
	accessTokenEnc = store.Enc
	return accessTokenEnc, nil

}

func InitUser(username string, password string) (userdataptr *User, err error) {
	var userdata User
	var userStorage Storage
	userdataptr = &userdata

	//*** CREATING USER DATA  ***

	// Generates 16bit Key using Password based key derivation function
	pkdfKey := userlib.Argon2Key([]byte(password), []byte(username), 16)

	// Generates 2 keys for PKE
	PKEEncKey, PKEDecKey, err := userlib.PKEKeyGen()

	// Generates RSA Pair for digital signitures
	DSSignKey, DSVerifyKey, err := userlib.DSKeyGen()

	// Generates 2 keys for Enc and HMAC (Used for encrypting and signing the userdata)
	encKey, _ := userlib.HashKDF(pkdfKey, []byte("encryption"))
	macKey, _ := userlib.HashKDF(pkdfKey, []byte("mac"))
	encKey = encKey[:16]
	macKey = macKey[:16]
	//Forms the userdata
	userdata.Username = username
	userdata.Password = password
	userdata.PKEDecKey = PKEDecKey
	userdata.DSSignKey = DSSignKey

	//Encrypts the userdata
	userdataMarshal, _ := json.Marshal(userdata)
	iv := userlib.RandomBytes(16)
	userdataEnc := userlib.SymEnc(encKey, iv, userdataMarshal)

	// HMAC the userdata
	// fmt.Println(len(macKey))
	userdataHmac, _ := userlib.HMACEval(macKey, userdataMarshal)

	// Create a new struct that holds the encryption and HMAC of the encryption
	userStorage.Enc = userdataEnc
	userStorage.HMAC = userdataHmac

	//*** STORING ***

	// Storing userdata into datastore TODO: THIS MIGHT CAUSE AN ERROR IF 2 USERNAMES HAVE SAME 16 BYTES
	uuid, _ := uuid.FromBytes([]byte(username)[:16])
	userStorageMarshal, _ := json.Marshal(userStorage)
	userlib.DatastoreSet(uuid, userStorageMarshal)

	// Storing keys into keystore
	userlib.KeystoreSet(username+"PKE", PKEEncKey)
	userlib.KeystoreSet(username+"DS", DSVerifyKey)

	// Return userdata and error
	return &userdata, nil
}

//GetUser: This fetches the user information from the Datastore.  It should
// fail with an error if the user/password is invalid, or if the user
// data was corrupted, or if the user can't be found.
func GetUser(username string, password string) (userdataptr *User, err error) {
	var userdata User
	userdataptr = &userdata

	// Get UUID of user
	uuid, _ := uuid.FromBytes([]byte(username)[:16])
	userStorageMarshal, ok := userlib.DatastoreGet(uuid)
	if !ok {
		err = errors.New("Username is not found")
		return userdataptr, err
	}

	// Retrieving Enc key and HMAC key
	pkdfKey := userlib.Argon2Key([]byte(password), []byte(username), 16)
	encKey, _ := userlib.HashKDF(pkdfKey, []byte("encryption"))
	macKey, _ := userlib.HashKDF(pkdfKey, []byte("mac"))
	encKey = encKey[:16]
	macKey = macKey[:16]

	// Retrieving Ciphertext
	userStorage := Storage{}
	err = json.Unmarshal([]byte(userStorageMarshal), &userStorage)
	if err != nil {
		err = errors.New("Cannot Unmarshal user storage")
		return userdataptr, err
	}
	if userStorage.Enc == nil {
		err = errors.New("Data has been corrupted")
		return userdataptr, err
	}
	userdataEnc := userStorage.Enc

	// Decrypt userdata
	userdataMarshal := userlib.SymDec(encKey, userdataEnc)
	userdata = User{}
	_ = json.Unmarshal([]byte(userdataMarshal), &userdata)

	// Check if HMAC is correct
	// fmt.Println(len(macKey))
	userdataHmac, _ := userlib.HMACEval(macKey, userdataMarshal)
	checkHMAC := userlib.HMACEqual(userdataHmac, userStorage.HMAC)
	if !checkHMAC {
		err = errors.New("HMAC does not match")
		return userdataptr, err
	}

	// Check if password is correct
	if userdata.Password != password {
		err = errors.New("Password is incorrect")
		return userdataptr, err
	}

	// If no errors, return
	return &userdata, nil
}

// This stores a file in the datastore.
//
// The plaintext of the filename + the plaintext and length of the filename
// should NOT be revealed to the datastore!
func (userdata *User) StoreFile(filename string, data []byte) {

	// UUID for File header
	headerKey := userlib.Argon2Key([]byte(userdata.Username+filename+userdata.Password), []byte(userdata.Username), 16)
	headerUUID, _ := uuid.FromBytes((headerKey)[:16])

	// UUID for File data block
	dataUUID := uuid.New()

	// UUID for nonce
	nonceKey := userlib.Argon2Key([]byte(filename+userdata.Username+"nonce"), []byte(userdata.Username), 16)
	nonceUUID, _ := uuid.FromBytes((nonceKey)[:16])
	// nonce for generating a unique key
	nonce := userlib.RandomBytes(16)
	// nonce_signiture,_ := HMACEval(macKey, nonce)

	// Keys: One for encryption and one for hashing
	key := userlib.Argon2Key(append([]byte(userdata.Username+filename+userdata.Password), nonce...), []byte(userdata.Username), 16)
	macKey, encKey, err := userdata.getKeysFromKey(key)
	if err != nil {
		userlib.DebugMsg(err.Error())
	}

	// File header struct to be stored in datastore
	iv := userlib.RandomBytes(16)
	userTree := Tree{
		Username: userdata.Username,
	}
	fileHeaderContents := FileHeaderContents{
		Users:            userTree,
		File_data:        []uuid.UUID{dataUUID},
		Last_known_nonce: nonce,
	}
	fileHeaderContentsMarshal, _ := json.Marshal(fileHeaderContents)
	fileHeaderContentsEnc := userlib.SymEnc(encKey, iv, fileHeaderContentsMarshal)
	// fmt.Println(len(macKey))
	fileHeaderContentsHash, _ := userlib.HMACEval(macKey, fileHeaderContentsMarshal)

	fileHeader := Storage{
		Enc:  fileHeaderContentsEnc,
		HMAC: fileHeaderContentsHash,
	}
	fileHeaderMarshal, _ := json.Marshal(fileHeader)

	// File data to be stored in datastore
	encFileDataBlock := userlib.SymEnc(encKey, iv, data)
	// fmt.Println(len(macKey))
	blockSigniture, _ := userlib.HMACEval(macKey, data)
	fileDataBlock := Storage{
		Enc:  encFileDataBlock,
		HMAC: blockSigniture,
	}
	fileDataMarshal, _ := json.Marshal(fileDataBlock)

	// ********************************* STORING FIELDS FOR FILE ***************

	// Nonce
	encNonce := userlib.SymEnc(nonceKey, iv, nonce)
	userlib.DatastoreSet(nonceUUID, encNonce)

	//File Header
	userlib.DatastoreSet(headerUUID, fileHeaderMarshal)

	//File data block
	userlib.DatastoreSet(dataUUID, fileDataMarshal)

	// Creating own access token
	accessEncKey, ok := userlib.KeystoreGet(userdata.Username + "PKE")
	if !ok {
		panic("Cannot get PKE")
	}

	// ********************************* ACCESS TOKEN FOR THE OWNER ***************

	var accessToken AccessToken
	accessToken.OwnerUsername = userdata.Username
	accessToken.SenderUsername = userdata.Username
	accessToken.FileHeaderUUID = headerUUID
	accessToken.NonceUUID = nonceUUID
	accessToken.NonceKey = nonceKey
	accessToken.FileKey = key

	fileKeySigniture, err := userlib.DSSign(userdata.DSSignKey, key)
	if err != nil {
		panic("Cannot sign file key")
	}
	accessToken.FileKeySigniture = fileKeySigniture
	accessTokenMarshal, _ := json.Marshal(accessToken)

	// **** We have to use an access token retriever so that we can use PKE***
	// Access token will be symetrically encrypted
	var accessTokenRetriever AccessTokenRetriever
	accessTokenRetriever.AccessTokenUUID = uuid.New()
	accessTokenRetriever.AccessTokenKey = userlib.RandomBytes(16)
	accessTokenRetrieverMarshal, _ := json.Marshal(accessTokenRetriever)
	accessTokenRetrieverUUID, _ := uuid.FromBytes(userlib.Argon2Key([]byte(filename+userdata.Username), []byte(filename), 16))
	accessTokenRetrieverEnc, err1 := userlib.PKEEnc(accessEncKey, accessTokenRetrieverMarshal)
	if err1 != nil {
		userlib.DebugMsg(err1.Error())
		panic("Cannot encrypt access token")
	}
	userlib.DatastoreSet(accessTokenRetrieverUUID, accessTokenRetrieverEnc)
	accessTokenEnc := userlib.SymEnc(accessTokenRetriever.AccessTokenKey, userlib.RandomBytes(16), accessTokenMarshal)
	storeAccessToken := storeAccessToken(accessTokenEnc)
	userlib.DatastoreSet(accessTokenRetriever.AccessTokenUUID, storeAccessToken)
	return
}

// This adds on to an existing file.
//
// Append should be efficient, you shouldn't rewrite or reencrypt the
// existing file, but only whatever additional information and
// metadata you need.
func (userdata *User) AppendFile(filename string, data []byte) (err error) {

	// STORE THE DATA IN A NEW UUID
	dataUUID := uuid.New()
	accessToken, _ := userdata.LoadAccessToken(filename, userdata.Username)
	macKey, encKey, err1 := userdata.getKeysFromKey(accessToken.FileKey)
	if err1 != nil {
		userlib.DebugMsg(err1.Error())
		return err1
	}
	iv := userlib.RandomBytes(16)
	encFileDataBlock := userlib.SymEnc(encKey, iv, data)
	blockSigniture, _ := userlib.HMACEval(macKey, data)
	fileDataBlock := Storage{
		Enc:  encFileDataBlock,
		HMAC: blockSigniture,
	}
	fileDataMarshal, _ := json.Marshal(fileDataBlock)
	userlib.DatastoreSet(dataUUID, fileDataMarshal)

	// ADD IT TO THE FILE HEADER CONTENTS
	fileHeaderContents, _ := userdata.LoadFileHeaderContents(filename)
	fileHeaderContents.File_data = append(fileHeaderContents.File_data, dataUUID)
	fileHeaderContentsMarshal, _ := json.Marshal(fileHeaderContents)
	fileHeaderContentsEnc := userlib.SymEnc(encKey, iv, fileHeaderContentsMarshal)
	fileHeaderContentsHash, _ := userlib.HMACEval(macKey, fileHeaderContentsMarshal)
	fileHeader := Storage{
		Enc:  fileHeaderContentsEnc,
		HMAC: fileHeaderContentsHash,
	}
	fileHeaderMarshal, _ := json.Marshal(fileHeader)
	userlib.DatastoreSet(accessToken.FileHeaderUUID, fileHeaderMarshal)

	return nil
}

func (userdata *User) getKeysFromKey(key []byte) (macKey []byte, encKey []byte, err error) {
	if len(key) != 16 {
		return nil, nil, errors.New(strings.ToTitle("keys not of 16 bytes"))
	}
	encKey, _ = userlib.HashKDF(key, []byte("encryption"))
	encKey = encKey[:16]
	macKey, _ = userlib.HashKDF(key, []byte("mac"))
	macKey = macKey[:16]
	return macKey, encKey, nil
}

func (userdata *User) LoadFileHeaderContents(filename string) (fileHeaderContents FileHeaderContents, err error) {

	// Get Access token
	accessToken, _ := userdata.LoadAccessToken(filename, userdata.Username)

	// Get nonce from datastore
	nonceUUID := accessToken.NonceUUID
	nonce, ok := userlib.DatastoreGet(nonceUUID)
	if !ok {
		return fileHeaderContents, errors.New(strings.ToTitle("Cannot retreive nonce"))
	}
	if len(nonce) != 32 {
		return fileHeaderContents, errors.New(strings.ToTitle("Nonce has been corrupted"))
	}

	nonce = userlib.SymDec(accessToken.NonceKey, nonce)

	// Get File Header
	headerUUID := accessToken.FileHeaderUUID
	fileHeaderMarshal, ok := userlib.DatastoreGet(headerUUID)
	if !ok {
		userlib.DebugMsg("Cannot get file header")
	}

	var fileHeader Storage
	error := json.Unmarshal(fileHeaderMarshal, &fileHeader)
	if error != nil {
		userlib.DebugMsg(error.Error())
		return fileHeaderContents, error
	}

	// Get filekey to decrypt file header
	key := accessToken.FileKey
	macKey, encKey, err1 := userdata.getKeysFromKey(key)
	if err1 != nil {
		userlib.DebugMsg(error.Error())
		return fileHeaderContents, err1
	}

	// Get file header contents and check for authenticity
	fileHeaderContentsEnc := fileHeader.Enc
	if fileHeaderContentsEnc == nil {
		return fileHeaderContents, errors.New(strings.ToTitle("File has been corrupted!"))
	}
	fileHeaderContentsMarshal := userlib.SymDec(encKey, fileHeaderContentsEnc)
	fileHeaderContentsHash, _ := userlib.HMACEval(macKey, fileHeaderContentsMarshal)
	if !userlib.HMACEqual(fileHeaderContentsHash, fileHeader.HMAC) {
		return fileHeaderContents, errors.New(strings.ToTitle("File has been changed!"))
	}
	error1 := json.Unmarshal(fileHeaderContentsMarshal, &fileHeaderContents)
	if error1 != nil {
		return fileHeaderContents, errors.New(strings.ToTitle("Cannot unmarshal contents"))
	}
	return fileHeaderContents, nil

}

// ********************************* RETRIEVING ACCESS TOKEN ***************
func (userdata *User) LoadAccessToken(filename string, username string) (accessToken AccessToken, err error) {
	// Sender gets his own access token
	accessTokenRetrieverUUID, _ := uuid.FromBytes(userlib.Argon2Key([]byte(filename+userdata.Username), []byte(filename), 16))

	accessTokenRetrieverEnc, ok := userlib.DatastoreGet(accessTokenRetrieverUUID)

	if !ok {
		return accessToken, errors.New(strings.ToTitle("Cannot Retreive access token retriever"))
	}

	// Sender decrypt the access Token
	accessTokenRetrieverMarshal, err := userlib.PKEDec(userdata.PKEDecKey, accessTokenRetrieverEnc)

	if err != nil {
		userlib.DebugMsg(err.Error())
		return accessToken, errors.New(strings.ToTitle("Cannot unmarshal accesstoken"))
	}
	var accessTokenRetriever AccessTokenRetriever
	_ = json.Unmarshal(accessTokenRetrieverMarshal, &accessTokenRetriever)
	accessTokenUUID := accessTokenRetriever.AccessTokenUUID
	accessTokenKey := accessTokenRetriever.AccessTokenKey

	if len(accessTokenKey) != 16 {
		return accessToken, errors.New(strings.ToTitle("access Token Corrupted"))
	}

	// Getting the access token
	accessTokenEncStore, ok := userlib.DatastoreGet(accessTokenUUID)

	if !ok {
		return accessToken, errors.New(strings.ToTitle("Cannot get accessToken"))
	}
	accessTokenEnc, err1 := retreiveAccessToken(accessTokenEncStore)
	if err1 != nil {
		userlib.DebugMsg(err1.Error())

		return accessToken, err1
	}

	accessTokenMarshal := userlib.SymDec(accessTokenKey, accessTokenEnc)
	_ = json.Unmarshal(accessTokenMarshal, &accessToken)

	return accessToken, err
}

// This loads a file from the Datastore.
//
// It should give an error if the file is corrupted in any way.
func (userdata *User) LoadFile(filename string) (data []byte, err error) {

	// Get Access token
	accessToken, err := userdata.LoadAccessToken(filename, userdata.Username)
	if err != nil {
		return nil, err
	}

	fileHeaderContents, err1 := userdata.LoadFileHeaderContents(filename)
	if err1 != nil {
		userlib.DebugMsg(err1.Error())
	}

	macKey, encKey, err2 := userdata.getKeysFromKey(accessToken.FileKey)
	if err2 != nil {
		userlib.DebugMsg(err2.Error())
	}
	// Get the file data
	var fileData []byte
	for i := 0; i < len(fileHeaderContents.File_data); i++ {
		// Get file data
		fileDataMarshal, ok := userlib.DatastoreGet(fileHeaderContents.File_data[i])
		if !ok {
			return nil, errors.New(strings.ToTitle("Cannot Find file contents"))
		}
		var fileDataBlock Storage
		error2 := json.Unmarshal(fileDataMarshal, &fileDataBlock)
		if error2 != nil {
			return nil, errors.New(strings.ToTitle("Cannot Unmarshal filedatamarshal"))
		}
		encFileDataBlock := fileDataBlock.Enc
		data := userlib.SymDec(encKey, encFileDataBlock)
		// fmt.Println(len(macKey))
		testSigniture, _ := userlib.HMACEval(macKey, data)
		blockSigniture := fileDataBlock.HMAC

		// Check if correct
		if !userlib.HMACEqual(testSigniture, blockSigniture) {
			return nil, errors.New(strings.ToTitle("File Data block has been changed!"))
		}

		// Append to fileData
		fileData = append(fileData, data...)
	}

	return fileData, nil
}

func addUser(users Tree, username string, receipient string) (addedUser Tree) {

	if username == users.Username {

		var user Tree
		user.Username = receipient
		users.Children = append(users.Children, user)
		addedUser = users
		return addedUser
	}

	for i := 0; i < len(users.Children); i++ {
		users.Children[i] = addUser(users.Children[i], username, receipient)
	}
	return users

}

// This creates a sharing record, which is a key pointing to something
// in the datastore to share with the recipient.

// This enables the recipient to access the encrypted file as well
// for reading/appending.

// Note that neither the recipient NOR the datastore should gain any
// information about what the sender calls the file.  Only the
// recipient can access the sharing record, and only the recipient
// should be able to know the sender.
func (userdata *User) ShareFile(filename string, recipient string) (
	magic_string string, err error) {

	// ********************************* RETRIEVING SENDER's ACCESS TOKEN ***************
	accessToken, err := userdata.LoadAccessToken(filename, userdata.Username)

	// ********************************* RETRIEVING FILE HEADER CONTENTS TO ADD RECEIPIENT ***************
	fileHeaderContents, err := userdata.LoadFileHeaderContents(filename)
	if err != nil {
		userlib.DebugMsg(err.Error())
		return "", err
	}
	// ********************************* CHANGE FILE HEADER CONTENTS TO ADD RECEIPTIENT ***************
	// ADD USER
	addedUser := addUser(fileHeaderContents.Users, userdata.Username, recipient)
	fileHeaderContents.Users = addedUser

	// ********************************* STORE FILE HEADER CONTENTS ***************
	key := accessToken.FileKey
	macKey, encKey, err1 := userdata.getKeysFromKey(key)
	if err1 != nil {
		userlib.DebugMsg(err1.Error())
	}
	fileHeaderContentsMarshal, _ := json.Marshal(fileHeaderContents)
	fileHeaderContentsEnc := userlib.SymEnc(encKey, userlib.RandomBytes(16), fileHeaderContentsMarshal)
	// fmt.Println(len(macKey))
	fileHeaderContentsHash, _ := userlib.HMACEval(macKey, fileHeaderContentsMarshal)

	fileHeader := Storage{
		Enc:  fileHeaderContentsEnc,
		HMAC: fileHeaderContentsHash,
	}
	fileHeaderMarshal, _ := json.Marshal(fileHeader)
	userlib.DatastoreSet(accessToken.FileHeaderUUID, fileHeaderMarshal)

	// ********************************* FORM ACCESS TOKEN ***************
	//Building access token to send to receipient
	var sendingAccessToken AccessToken
	sendingAccessToken.SenderUsername = userdata.Username
	sendingAccessToken.NonceUUID = accessToken.NonceUUID
	sendingAccessToken.NonceKey = accessToken.NonceKey
	sendingAccessToken.FileHeaderUUID = accessToken.FileHeaderUUID
	sendingAccessToken.FileKey = accessToken.FileKey
	sendingAccessTokenMarshal, _ := json.Marshal(sendingAccessToken)

	// Encrypting access token retriever with public key of receipient
	recipientPublicKey, ok := userlib.KeystoreGet(recipient + "PKE")

	if !ok {
		return "", errors.New(strings.ToTitle("receipient not found"))
	}

	// *************************** SEND ACCESS TOKEN ***************************
	// **** We have to use an access token retriever so that we can use PKE***
	// Access token will be symetrically encrypted
	var accessTokenRetriever AccessTokenRetriever
	accessTokenRetriever.AccessTokenUUID = uuid.New()
	accessTokenRetriever.AccessTokenKey = userlib.RandomBytes(16)
	accessTokenRetrieverMarshal, _ := json.Marshal(accessTokenRetriever)
	accessTokenRetrieverEnc, err1 := userlib.PKEEnc(recipientPublicKey, accessTokenRetrieverMarshal)

	if err1 != nil {
		userlib.DebugMsg(err1.Error())
		panic("Cannot encrypt access token")
	}

	// STORE ACCESS TOKEN IN THE DATASTORE
	sendingAccessTokenEnc := userlib.SymEnc(accessTokenRetriever.AccessTokenKey, userlib.RandomBytes(16), sendingAccessTokenMarshal)
	storeAccessToken := storeAccessToken(sendingAccessTokenEnc)
	userlib.DatastoreSet(accessTokenRetriever.AccessTokenUUID, storeAccessToken)
	// Sends the access token retriever to the recipient
	s, _ := json.Marshal(accessTokenRetrieverEnc)

	magic_string = string(s)
	return magic_string, nil
}

// Note recipient's filename can be different from the sender's filename.
// The recipient should not be able to discover the sender's view on
// what the filename even is!  However, the recipient must ensure that
// it is authentically from the sender.
func (userdata *User) ReceiveFile(filename string, sender string,
	magic_string string) error {

	// *************************** Stores the accesstoken retreiver with username and filename of the receipient ***************************
	accessTokenRetrieverUUID, _ := uuid.FromBytes(userlib.Argon2Key([]byte(filename+userdata.Username), []byte(filename), 16))
	var accessTokenRetrieverEnc []byte
	json.Unmarshal([]byte(magic_string), &accessTokenRetrieverEnc)
	userlib.DatastoreSet(accessTokenRetrieverUUID, accessTokenRetrieverEnc)
	return nil
}

// Removes target user's access.
func (userdata *User) RevokeFile(filename string, target_username string) (err error) {
	// Load the file header contents
	// change the file key by using a new nonce
	// Update tree
	return
}
