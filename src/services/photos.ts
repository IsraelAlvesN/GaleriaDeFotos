import { Photo } from "../types/Photo"
import { storage } from "../libs/firebase"
import { ref, listAll, getDownloadURL } from "firebase/storage"

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