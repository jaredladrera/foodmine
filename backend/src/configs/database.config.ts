import mongoose, { connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    mongoose.set('strictQuery', true);
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log('connection succesfully'),
        (error) => console.log(error)
    )
}