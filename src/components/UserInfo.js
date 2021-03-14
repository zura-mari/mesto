export default class UserInfo { 
    constructor({userName, aboutUser}){
        this._userName = userName;
        this._aboutUser = aboutUser;
    };

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._aboutUser.textContent
        }
    };

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._aboutUser.textContent = data.about;
    };
};
