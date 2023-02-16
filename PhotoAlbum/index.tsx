import  * as Components from './styles'

type Props = {
   url:string;
   name: string;
   onDelete : (name: string) => void;
}
export const PhotoItem = ({ url, name, onDelete}:Props ) => {

    return(
        
       
       <Components.Container>
         <img src={ url} alt={ name}/>
         {name}
         <button onClick={()=> onDelete(name)}>Excluir</button>
        
       </Components.Container>
        
    )
}

