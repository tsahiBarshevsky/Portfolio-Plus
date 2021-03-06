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
        if (doc.data())
            return doc.data();
        return null;
    }

    async getLastUpdate(user)
    {
        const ref = this.db.collection(`list-of-users`).doc(`${user}`);
        const doc = await ref.get();
        return doc.data() ? doc.data().lastUpdate : null;
    }

    async getProfession(user)
    {
        const ref = this.db.collection(`list-of-users`).doc(`${user}`);
        const doc = await ref.get();
        return doc.data() ? doc.data().profession : null;
    }

    async updateProfession(user, profession)
    {
        this.db.collection(`list-of-users`).doc(`${user}`).update({
            profession: profession
        });
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
        return doc.data() ? doc.data().background : null;
    }

    async resetPassword(email)
    {
        this.auth.sendPasswordResetEmail(email);
    }

    async emailVerification()
    {
        this.auth.currentUser.sendEmailVerification();
    }

    async checkEmailVerification()
    {
        this.auth.onAuthStateChanged(function(user)
        {
            if (user !== null)
                if (user.emailVerified)
                    return true;
            return false;
        });
    }

    async deleteQueryBatch(db, query, resolve) 
    {
        const snapshot = await query.get();
        const batchSize = snapshot.size;
        if (batchSize === 0) 
        {
            // When there are no documents left, we are done
            resolve();
            return;
        }
      
        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
      
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            this.deleteQueryBatch(db, query, resolve);
        });
    }

    async deleteCollection(collectionPath, batchSize) 
    {
        const collectionRef = this.db.collection(collectionPath);
        const query = collectionRef.orderBy('__name__').limit(batchSize);
        return new Promise((resolve, reject) => {
            this.deleteQueryBatch(this.db, query, resolve).catch(reject);
        });
    }

    async deleteAccount()
    {
        var name = this.auth.currentUser.displayName;
        this.auth.currentUser.delete();
        this.deleteUserFromList(name);
        this.deleteCollection(`/${name}`, 100);
    }
}

export default new Firebase();