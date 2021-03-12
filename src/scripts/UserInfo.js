export default class UserInfo { 
    constructor(data, userName, aboutUser){
        this._userName = userName;
        this._aboutUser = aboutUser;
        this._name = data.name;
        this._about = data.about;
    };

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._aboutUser.textContent
        }
    };

    setUserInfo() {
        this._userName.textContent = this._name;
        this._aboutUser.textContent = this._about;
    };
};
