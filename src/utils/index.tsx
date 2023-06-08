export const fromFileToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const sleep = (ms:number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const BlobToBase64 = (blobUrl:any)=> {
  
  /* let blobUrl = URL.createObjectURL(blob); */
  return new Promise((resolve, reject) => {
              let img = new Image();
              img.onload = () => resolve(img);
              img.onerror = err => reject(err);
              img.src = blobUrl;
          }).then((img:any) => {
              URL.revokeObjectURL(blobUrl);
              // Limit to 256x256px while preserving aspect ratio
              let [w,h] = [img.width,img.height]
              let aspectRatio = w/h
              // Say the file is 1920x1080
              // divide max(w,h) by 256 to get factor
              let factor = Math.max(w,h)/256
              w = w/factor
              h = h/factor
              let canvas = document.createElement("canvas");
              canvas.width = w;
              canvas.height = h;
              let ctx:any = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              return canvas.toDataURL();
          })
}