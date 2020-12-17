import {UploadProductType} from "../redux/types/productTypes";


export const createUploadProductFormData = ({name,price,shortDescription,longDescription,categoryId,files} : UploadProductType) => {
    const formData = new FormData();
    formData.append('name',name)
    formData.append('price',price.toString())
    formData.append('short_description',shortDescription);
    formData.append('long_description',longDescription);
    formData.append('categoryId',categoryId.toString());
    files.map(file => formData.append('files',file))
    return formData;
}

export const createUpdateProfileFormData = ({name,userName,phone,imagePath} : any) => {
    const formData = new FormData();
    formData.append('name',name);
    formData.append('userName',userName);
    formData.append('phone',phone);
    if(imagePath)
        formData.append('imagePath',imagePath)
    return formData
}
