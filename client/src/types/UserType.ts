
interface UserType {
    _id: string;
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
}

export default UserType