import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    foto: {
        data: Buffer,
        contentType: String
    }
})
const User = mongoose.model('User', userSchema, 'usuarios');

export default User;
