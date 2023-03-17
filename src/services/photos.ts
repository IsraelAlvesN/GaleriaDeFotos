import { Photo } from "../types/Photo"
import { storage } from "../libs/firebase"
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage"
import { v4 as createId} from 'uuid'

export const getAll = async () => {
    let list: Photo[] = []

    //images é a pasta no firebase
    const imagesFolder = ref(storage, 'images')
    //images folder é a referência para listAll
    const photoList = await listAll(imagesFolder)

    for(let i in photoList.items){
        //gerar link de download
        let photoUrl = await getDownloadURL(photoList.items[i])

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        })
    }

    return list
}

export const insert = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
        //nome random para o arquivo
        let randomName = createId()
        let newFile = ref(storage, `images/${randomName}`)
        
        //salvar no firebase
        let upload = await uploadBytes(newFile, file)
        let photoUrl = await getDownloadURL(upload.ref)

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo
    }else{
        return new Error('Arquivo não permitido')
    }
}