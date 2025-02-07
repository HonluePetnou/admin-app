import { List, Datagrid, TextField, ReferenceField } from 'react-admin';
import { useRecordContext } from 'react-admin';
import { styled } from '@mui/material/styles';

// Function to generate a random date within the last year
const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1); // Set to one year ago
    return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime()));
};

// Custom component to display the generated date
const DateField = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>{new Intl.DateTimeFormat('en-US').format(getRandomDate())}</span>;
};

// Function to generate a random status
const getRandomStatus = (): 'Published' | 'Draft' | 'Archived' => {
    const statuses: ('Published' | 'Draft' | 'Archived')[] = ['Published', 'Draft', 'Archived'];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

// Styles for Status column
interface StatusFieldProps {
    status: string;
}

const StatusField = styled('span')<StatusFieldProps>(({ status }) => ({
    backgroundColor: status === 'Published' ? 'green' : status === 'Draft' ? 'orange' : 'gray',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '1.25rem',
    padding: '0.2em 0.6em',
    borderRadius: '1em',
}));

const StatusFieldComponent = () => {
    const record = useRecordContext();
    if (!record) return null;
    const randomStatus = getRandomStatus(); // Generate a random status
    return <StatusField status={randomStatus}>{randomStatus}</StatusField>;
};

// List of posts with dynamically generated date
export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="title" label="Title" />
            <ReferenceField source="userId" reference="users" label="Author">
                <TextField source="name" />
            </ReferenceField>
            <DateField label="Date" /> {/* Use the custom date field */}
            <StatusFieldComponent label="Status" />
            {/* <EditButton /> */}
        </Datagrid>
    </List>
);
