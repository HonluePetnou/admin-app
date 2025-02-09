import React, { useState } from 'react';
import { Datagrid, EmailField, List, TextField, useNotify, useDataProvider, useRefresh } from 'react-admin';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// Composant pour le bouton d'action en lot de désactivation
interface BulkDisableButtonProps {
    selectedIds: string[];  // Ajoutez la propriété selectedIds
}

const BulkDisableButton: React.FC<BulkDisableButtonProps> = ({ selectedIds }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const notify = useNotify();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleConfirm = async (): Promise<void> => {
        setLoading(true);
        try {
            // Pour chaque utilisateur sélectionné, on met à jour son statut (désactivation ici)
            await Promise.all(
                selectedIds.map(id => {
                    return dataProvider.update('users', {
                        id,
                        data: { active: false }, // Vous pouvez ici désactiver l'utilisateur
                        previousData: {} // Vous pouvez aussi fournir un objet de données précédent si nécessaire
                    });
                })
            );

            setLoading(false);
            notify('Users disabled successfully', { type: 'success' });
            refresh(); // Rafraîchit la liste après la mise à jour
            setOpen(false);
        } catch (error) {
            setLoading(false);
            notify('Error disabling users', { type: 'error' });
        }
    };

    return (
        <>
            <Button onClick={handleClickOpen} color="primary">
                Disable Users
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Disable</DialogTitle>
                <DialogContent>
                    Are you sure you want to disable the selected users?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" disabled={loading}>
                        {loading ? 'Disabling...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const UserList: React.FC = () => (
    <List>
        <Datagrid bulkActionButtons={<BulkDisableButton selectedIds={[]} />}>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);
