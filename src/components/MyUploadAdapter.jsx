export default class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }



    upload() {
        return this.loader.file.then((file) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', file);

                fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        resolve({ default: data.url });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        });
    }

    abort() {
        // Handle abort
    }
}
