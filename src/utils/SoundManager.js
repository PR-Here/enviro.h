import Sound from 'react-native-sound';

// Initialize the sound module
Sound.setCategory('Playback');

// Define a common method for playing a sound
const playSound = (soundFile, onEndCallback) => {
    // const sound = new Sound('notication.mp3', Sound.MAIN_BUNDLE, (error) => {
    var sound = new Sound(soundFile, error => {

        if (error) {
            console.error('Error loading sound', error);
            return;
        }
        // Play the sound
        sound.play((success) => {
            if (success) {
                console.log('Sound played successfully');
            } else {
                console.error('Error playing sound');
            }


            // Invoke the callback if provided
            if (onEndCallback) {
                onEndCallback();
            }

            // Release the sound to free up resources
            sound.release();
        });
    });
};

export { playSound };
