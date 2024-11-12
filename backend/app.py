from flask import Flask, request, jsonify
import os
import joblib
import librosa
import numpy as np

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
model = joblib.load('model/your_model.pkl')  # Load your ML model

# Equalizer presets based on genre
equalizer_presets = {
    'pop': {'bass': 70, 'mid': 50, 'treble': 60},
    'metal': {'bass': 60, 'mid': 70, 'treble': 60},
    'jazz': {'bass': 60, 'mid': 80, 'treble': 70}
}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        genre = classify_audio(filepath)
        return jsonify({'message': 'File uploaded successfully!', 'genre': genre})

def classify_audio(filepath):
    # Load and preprocess the audio
    y, sr = librosa.load(filepath, sr=None)
    # Extract features (you may need to adjust this based on your model)
    features = np.array([librosa.feature.mfcc(y=y, sr=sr).mean(axis=1)])  # Example feature
    genre = model.predict(features)  # Predict genre using your model
    return genre[0]  # Return the predicted genre

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)