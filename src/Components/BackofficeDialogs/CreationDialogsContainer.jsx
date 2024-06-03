import React, { useState } from 'react';
import { Button } from '@mui/material';
import CreateImageDialog from './CreateImageDialog';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreateMaterialDialog from './CreateMaterialDialog';

const CreationDialogsContainer = () => {
    const [openCreateImageDialog, setOpenCreateImageDialog] = useState(false);
    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);
    const [openCreateMaterialDialog, setOpenCreateMaterialDialog] = useState(false);

    const handleOpenCreateImageDialog = () => {
        setOpenCreateImageDialog(true);
    };

    const handleCloseCreateImageDialog = () => {
        setOpenCreateImageDialog(false);
    };

    const handleOpenCreateCategoryDialog = () => {
        setOpenCreateCategoryDialog(true);
    };

    const handleCloseCreateCategoryDialog = () => {
        setOpenCreateCategoryDialog(false);
    };

    const handleOpenCreateMaterialDialog = () => {
        setOpenCreateMaterialDialog(true);
    };

    const handleCloseCreateMaterialDialog = () => {
        setOpenCreateMaterialDialog(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCreateImageDialog}
                style={{ marginTop: '20px', marginRight: '5px' }}
            >
                Créer une nouvelle image
            </Button>
            <CreateImageDialog
                open={openCreateImageDialog}
                handleClose={handleCloseCreateImageDialog}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCreateCategoryDialog}
                style={{ marginTop: '20px', marginRight: '5px' }}
            >
                Créer une nouvelle catégorie
            </Button>
            <CreateCategoryDialog
                open={openCreateCategoryDialog}
                handleClose={handleCloseCreateCategoryDialog}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCreateMaterialDialog}
                style={{ marginTop: '20px', marginRight: '5px' }}
            >
                Créer un nouveau matériau
            </Button>
            <CreateMaterialDialog
                open={openCreateMaterialDialog}
                handleClose={handleCloseCreateMaterialDialog}
            />
        </div>
    );
};

export default CreationDialogsContainer;
