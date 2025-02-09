import { List, Datagrid, TextField, ReferenceField, ReferenceInput, SelectInput } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { styled } from '@mui/material/styles';

// Fonction pour générer une date aléatoire dans l'année passée
const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1); // Définit la date de départ à un an en arrière
    return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime())); // Retourne une date aléatoire entre il y a un an et aujourd'hui
};

// Composant personnalisé pour afficher la date générée
const DateField = () => {
    const record = useRecordContext(); // Récupère le contexte d'enregistrement actuel
    if (!record) return null;
    return <span>{new Intl.DateTimeFormat('en-US').format(getRandomDate())}</span>; // Formate et affiche la date aléatoire
};

// Fonction pour générer un statut aléatoire
const getRandomStatus = (): 'Published' | 'Draft' | 'Archived' => {
    const statuses: ('Published' | 'Draft' | 'Archived')[] = ['Published', 'Draft', 'Archived']; // Liste des statuts possibles
    return statuses[Math.floor(Math.random() * statuses.length)]; // Retourne un statut aléatoire
};

// Styles pour la colonne de statut
interface StatusFieldProps {
    status: string; // Propriété de statut à passer au composant
}

// Composant pour afficher le statut avec un style en fonction du type
const StatusField = styled('span')<StatusFieldProps>(({ status }) => ({
    backgroundColor: status === 'Published' ? 'green' : status === 'Draft' ? 'orange' : 'gray', // Applique une couleur de fond différente en fonction du statut
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '1.25rem',
    padding: '0.2em 0.6em',
    borderRadius: '1em', // Forme arrondie pour le statut
}));

// Composant pour afficher le statut
const StatusFieldComponent = () => {
    const record = useRecordContext(); // Récupère le contexte d'enregistrement actuel
    if (!record) return null;
    const randomStatus = getRandomStatus(); // Génère un statut aléatoire
    return <StatusField status={randomStatus}>{randomStatus}</StatusField>; // Affiche le statut avec le style associé
};

// Filtres pour la liste des posts
const postFilters = [
    <ReferenceInput source="userId" reference="users" label="Author"/>, // Filtre par auteur (référence utilisateur)
    <SelectInput
        label="Status"
        source="status"  // Cette clé doit correspondre au champ du dataset
        choices={[
            { id: 'Published', name: 'Published' },
            { id: 'Draft', name: 'Draft' },
            { id: 'Archived', name: 'Archived' },
        ]}
    />,   
];

// Liste des posts avec une date générée dynamiquement
export const PostList = () => (
    <List filters={postFilters}> {/* Applique les filtres définis */}
        <Datagrid rowClick="edit"> {/* Liste les posts avec la possibilité de les éditer */}
            <TextField source="title" label="Title" /> {/* Affiche le titre du post */}
            <ReferenceField source="userId" reference="users" label="Author">
                <TextField source="name" /> {/* Affiche le nom de l'auteur */}
            </ReferenceField>
            <DateField label="Date" /> {/* Utilise le composant DateField personnalisé pour afficher la date */}
            <StatusFieldComponent label="Status" /> {/* Affiche le statut avec le style */}
        </Datagrid>
    </List>
);
