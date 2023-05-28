from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image
import io
import os
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

model = YOLO('model.pt')


def get_timestamp_string():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    return timestamp


@app.route('/detect', methods=['POST'])
def detect_objects():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400
    else:

        image_data = request.files['image'].read()
        image = Image.open(io.BytesIO(image_data))

        # Save the image file
        timestamp_string = get_timestamp_string()
        image_path = timestamp_string + '_image.jpg'
        image.save(image_path)
        
        results = model.predict(image_path)
        results = results[0]
        response = []
        for box in results.boxes:
            label = results.names[box.cls[0].item()]
            cords = [round(x) for x in box.xyxy[0].tolist()]
            prob = box.conf[0].item()
            obj = {
                'class': label,
                'x': cords[0],
                'y': cords[1],
                'width': cords[2],
                'height': cords[3],
                'confidence': prob
            }
            response.append(obj)
            data = {
                'status': 'success',
                'data': {
                    'predictions': response
                }
            }
        return jsonify(data), 200


if __name__ == '__main__':
    app.run()
