import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_API = 'https://project-e-api.herokuapp.com';

export default {
    checkToken: async (token, user) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token, user})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (USR_LOGINNAME, USR_PASSWORD) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_LOGINNAME, USR_PASSWORD})
        });
        const json = await req.json();

        return json;
    },
    signUp: async (USR_NAME, USR_DATEBIRTHDAY, USR_PHONENUMBER, USRDOC_CPFNUMBER, USR_LOGINNAME, USR_PASSWORD, USR_PHOTO) => {
        const req = await fetch(`${BASE_API}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_NAME, USR_DATEBIRTHDAY, USR_PHONENUMBER, USRDOC_CPFNUMBER, USR_LOGINNAME, USR_PASSWORD, USR_PHOTO})
        });
        const json = await req.json();
        return json;
    },
    signOut: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();

        return json;
    },
    getBooks: async () => {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    getBookByGen: async (GEN_NOME) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/book/byGen`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, GEN_NOME})
        });
        const json = await req.json();
        return json;
    },
    getBookByName: async (BOOK_NAME, GEN_NOME) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book/byName`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({BOOK_NAME, GEN_NOME})
        });
        const json = await req.json();
        return json;
    },
    getUserId: async () => {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    locateBook: async (BOOK_ID, LOC_DATE_RETIRADA) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID, LOC_DATE_RETIRADA})
        });
        const json = await req.json();
        return json;
    },
    getLocates: async () => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/getLocates/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    giveBackBook: async (BOOK_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/giveBack`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID})
        });
        const json = await req.json();
        return json;
    },
    verifyFavorite: async (BOOK_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/verifyFavorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID})
        });
        const json = await req.json();
        return json;
    },
    addFavorite: async (BOOK_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/addFavorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID})
        });
        const json = await req.json();
        return json;
    },
    removeFavorite: async (BOOK_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/removeFavorites`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID})
        });
        const json = await req.json();
        return json;
    },
    getFavorites: async () => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/getFavorites/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    alterPassword: async (USR_ID, USR_PASSWORD) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/update/`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({USR_ID, USR_PASSWORD})
        });
        const json = await req.json();
        return json;
    },
    alterData: async (USR_ID, USR_NAME, USR_LOGINNAME, USR_PHONENUMBER, USR_DATEBIRTHDAY, USRDOC_CPFNUMBER) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/updateData/`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({USR_ID, USR_NAME, USR_LOGINNAME, USR_PHONENUMBER, USR_DATEBIRTHDAY, USRDOC_CPFNUMBER})
        });
        const json = await req.json();
        return json;
    },
    addBook: async (BOOK_NAME, BOOK_DESC, BOOK_GEN, BOOK_AUTHOR, BOOK_PATH) => {
        const req = await fetch(`${BASE_API}/book/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({BOOK_NAME, BOOK_DESC, BOOK_GEN, BOOK_AUTHOR, BOOK_PATH})
        });
        const json = await req.json();
        return json;
    },
    getBookLocates: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book/locates/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    getBookLocatesByUserName: async (USR_NAME) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book/locatesByUserName/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({USR_NAME})
        });
        const json = await req.json();
        return json;
    },
    getBookLocatesByBookName: async (BOOK_NAME) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book/locatesByBookName/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({BOOK_NAME})
        });
        const json = await req.json();
        return json;
    },
    getGenres: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book/getGenre/`, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    }
};