import { Create, SimpleForm, TextInput } from 'react-admin'

export default function CreatePost() {
  return (
    <Create>
        <SimpleForm>            
            <TextInput source="userId" />            
            <TextInput source="id" />            
            <TextInput source="title" />            
            <TextInput source="body" />        
        </SimpleForm>
    </Create>
  )
}
