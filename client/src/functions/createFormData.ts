import {UploadProductType} from "../redux/types/productTypes";


export const createUploadProductFormData = ({name,price,short_description,longDescription,category_id,files} : UploadProductType) => {
    const formData = new FormData();
    formData.append('name',name)
    formData.append('price',price.toString())
    formData.append('short_description',short_description);
    formData.append('longDescription',longDescription);
    formData.append('category_id',category_id.toString());
    files.map(file => formData.append('files',file))
    return formData;
}
