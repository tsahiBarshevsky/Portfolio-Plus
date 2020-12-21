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
        if (!this.auth.currentUser)
            return alert("Not authorized");
        return this.db.doc(`${this.auth.currentUser.displayName}/${title}`).set({
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
            snapshot => {}, 
            error => {console.log(error);});
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

    async getCurrentUserQuote()
    {
        if (this.auth.currentUser)
        {
            const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
            return quote.get('quote');
        }
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

    async addUserToList(name)
    {
        return this.db.doc(`list-of-users/${name}`).set({
            username: name
        });
    }

    async getAllUsers()
    {
        const snapshot = await app.firestore().collection(`list-of-users`).get();
        return snapshot.docs.map(doc => doc.data());
    }
    
}

export default new Firebase();