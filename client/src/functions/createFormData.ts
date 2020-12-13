import {UploadProductType} from "../redux/types/productTypes";


export const createUploadProductFormData = ({name,price,short_description,longDescription,categoryId,files} : UploadProductType) => {
    const formData = new FormData();
    formData.append('name',name)
    formData.append('price',price.toString())
    formData.append('short_description',short_description);
    formData.append('longDescription',longDescription);
    formData.append('categoryId',categoryId.toString());
    files.map(file => formData.append('files',file))
    return formData;
}
