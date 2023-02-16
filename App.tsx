import { FormEvent, useEffect,useState} from 'react';
import * as Components from './App.style'
import  * as Photos from './services/ServicesPhotos' ;
import { Photo } from './types/Photos';
import { PhotoItem } from './PhotoAlbum';

const App = () => {
  
  const[ uploading, setUploading] = useState ( false)
  const [ loading, setLoading] = useState( false);
  const [ photos, setPhotos] = useState<Photo[]>([])

  useEffect(()=>{
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await Photos.getAll());
    setLoading(false);
  }
 
  useEffect( () => {

    const getPhotos = async () =>{

      setLoading( true);
      setPhotos( await Photos.getAll());
      setLoading( false);

    }

     getPhotos();
} , []);


const handledelete = async ( name:string) =>{

  await Photos.DeletPhotos(name)
  getPhotos()
}

const heandleForm =  async (e: FormEvent<HTMLFormElement>) => {

  const formDate = new  FormData( e.currentTarget);
  const file = formDate.get('image') as File

if ( file && file.size) {

  setUploading( true)
   let result = await Photos.insert(file);
  setUploading( false)

  if ( result instanceof Error) {

     alert( `${result.name} - ${ result.message}`)
   } else{

  let newPhotos = [ ...photos];
    newPhotos.push(result)
    setPhotos(newPhotos);

   }

 }


}

 
  return(

    <Components.Container>

           Galeria de Fotos 
      <Components.Area>
  
        <Components.UploadForm method='POST ' onSubmit={heandleForm}>
        <input type='file' name='image'/>
        <input type='submit' value='enviar' />
        { uploading && 'enviando ...'}
        </Components.UploadForm>
        {
        
            loading &&
           <Components.ScreenWarning>
            <div  className='emoji'>📸</div>
            <div> carregando </div>
           </Components.ScreenWarning>
        }
        {

          !loading && photos.length > 0 &&
           <Components.PhotoList>


              {  photos.map( ( item, index) => (

                  <PhotoItem 
                  key={index} 
                  url={item.url}
                  name={item.name}
                  onDelete={handledelete}
                   />
              ) )}

            

           </Components.PhotoList>
         
        }

        

         
          
       

        {

          !loading && photos.length === 0 && 
          <Components.ScreenWarning>
          
          <div  className='emoji'>  😣 📸</div>
          <div> Nao ha fotos  </div>
         </Components.ScreenWarning>
      }
         
        

      </Components.Area>
    </Components.Container>

  )

}

export default App;