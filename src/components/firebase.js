import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAVgBNDlARe8CY5YRXP_vJXcrcMVVoMV00",
    authDomain: "portfolio-plus-3caf2.firebaseapp.com",
    projectId: "portfolio-plus-3caf2",
    storageBucket: "portfolio-plus-3caf2.appspot.com",
    messagingSenderId: "477542785620",
    appId: "1:477542785620:web:665a0eb78cf26635f543c1"
};
  

class Firebase
{
    constructor()
    {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    login(email, password)
    {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout()
    {
        return this.auth.signOut();
    }

    async register(name, email, password)
    {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        });
    }

    addProject(title, type, description, links, video)
    {
        const username = this.auth.currentUser.displayName;
        const now = new Date();
        const date = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
        if (!this.auth.currentUser)
            return alert("Not authorized");
        this.db.collection('list-of-users').doc(`${username}`).update({
            lastUpdate: date});
        return this.db.doc(`${username}/${title}`).set({
            title: title,
            type: type,
            description: description,
            links: links,
            video: video
        });
    }

    deleteProject(title)
    {
        if (!this.auth.currentUser)
            return alert("Not authorized");
        /*this.db.collection(`${this.auth.currentUser.displayName}`).where("title", "==", title).get()
        .then(querySnapshot => {
            querySnapshot.docs[0].ref.delete();
        });*/
        const res = this.db.collection(`${this.auth.currentUser.displayName}`).doc(`${title}`).delete();
    }

    uploadImage(image, name)
    {
        const uploadTask = this.storage.ref(`Profile images/${name}`).put(image);
        uploadTask.on(
            "state_changed", 
            snapshot => {console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)}, 
            error => {console.log(error);});
    }

    deleteImage(url)
    {
        let imageRef = this.storage.refFromURL(url);
        imageRef.delete().then(() => {
            console.log("Deleted")
        }).catch(err => console.log(err))
    }

    addQuote(quote)
    {
        if (!this.auth.currentUser)
            return alert("Not authorized");
        return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
            quote: quote,
            user: this.auth.currentUser.displayName
        });
    }

    isInitialized()
    {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    getCurrentUsername()
    {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    getCurrentUsernameEmail()
    {
        return this.auth.currentUser && this.auth.currentUser.email;
    }

    async getCurrentUserQuote()
    {
        if (this.auth.currentUser)
        {
            const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
            return quote.get('quote');
        }
    }

    async getSingleProject(username, title)
    {
        const cityRef = this.db.collection(`${username}`).doc(`${title}`);
        const doc = await cityRef.get();
        return doc.data();
    }

    async getAllProjects(username)
    {
        const snapshot = await app.firestore().collection(`${username}`).get();
        return snapshot.docs.map(doc => doc.data());
        /*this.db.collection(`users_codedamn_video`).onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData.length);
            return postData['quote'];
        });*/
    }

    async addUserToList(name, profession, date, background)
    {
        return this.db.doc(`list-of-users/${name}`).set({
            username: name,
            profession: profession,
            lastUpdate: date,
            background: background
        });
    }

    async getAllUsers()
    {
        const snapshot = await app.firestore().collection(`list-of-users`).get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getUserInfo(user) //profession and last update
    {
        const ref = this.db.collection(`list-of-users`).doc(`${user}`);
        const doc = await ref.get();
        return doc.data();
    }

    deleteUserFromList(name)
    {
        const res = this.db.collection(`list-of-users`).doc(`${name}`).delete();
    }
    
    async updateProject(username, title, type, description, links, video)
    {
        this.db.collection(`${username}`).doc(`${title}`).update({
            type: type,
            description: description,
            links: links,
            video: video
        });
    }

    async updateUserTheme(theme, username)
    {
        this.db.collection(`list-of-users`).doc(`${username}`).update({
            background: theme
        });
    }

    async getUserTheme(username)
    {
        const ref = this.db.collection(`list-of-users`).doc(`${username}`);
        const doc = await ref.get();
        return doc.data().background;
    }

    async updateUsername(username, oldUsername)
    {
        console.log(oldUsername);
        this.auth.currentUser.updateProfile({
            displayName: username
        });
    }
}

export default new Firebase();