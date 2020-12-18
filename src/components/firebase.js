import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

    async getAllQuotes()
    {
        const snapshot = await app.firestore().collection('users_codedamn_video').get();
        return snapshot.docs.map(doc => doc.data());
        /*this.db.collection(`users_codedamn_video`).onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData.length);
            return postData['quote'];
        });*/
    }
}

export default new Firebase();