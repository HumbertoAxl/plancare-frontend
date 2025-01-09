import { signalRConnection } from '../api/signalr';
const connection = signalRConnection();

export async function realTimeRegistrationCheck(carId, setRegistrationStatus, setServerTimeDisplay) {
    await connection.start().catch(console.error);

    connection.on('CarRegistration', (data) => {
        console.log(data) //Left on purpose for faciliting your review.
        setRegistrationStatus(data.isRegistrationValid);
        setServerTimeDisplay(data.currentTime)
    });

    connection.invoke('CheckCarRegistration', carId).catch(function (err) {
        return console.error(err.toString()); //This will throw an error in the console, if a connection was started, even if it was closed.
                                              //I do not know how to fix it, but it does not interfere with the usage of the application.
                                              //Sorry about that.
    });
}

export function stopRegistrationCheck() {
    connection.off('CarRegistration');
    connection.stop();
}