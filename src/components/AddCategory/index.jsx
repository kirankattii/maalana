import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Snackbar,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField as MuiTextField,
    Alert,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './AddCategory.scss';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState(['Electronics', 'Clothing', 'Accessories']);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [editCategory, setEditCategory] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {

    // });

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!categoryName) return;

        setLoading(true);

        // Simulate adding a category
        setTimeout(() => {
            setLoading(false);
            setCategories([...categories, categoryName]);
            setCategoryName('');
            setSnackbarMessage('Category added successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        }, 1000);
    };

    const handleUpdateCategory = () => {
        const updatedCategories = [...categories];
        updatedCategories[editIndex] = editCategory;
        setCategories(updatedCategories);
        setEditCategory('');
        setEditIndex(null);
        setOpenEditDialog(false);
        setSnackbarMessage('Category updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleEditCategory = (index) => {
        setEditCategory(categories[index]);
        setEditIndex(index);
        setOpenEditDialog(true);
    };

    const handleDeleteCategory = (index) => {
        setDeleteIndex(index);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        const updatedCategories = categories.filter((_, idx) => idx !== deleteIndex);
        setCategories(updatedCategories);
        setDeleteIndex(null);
        setOpenDeleteDialog(false);
        setSnackbarMessage('Category deleted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleBackToDashboard = () => {
        navigate('/admin/dashboard');
    };

    return (
        <Grid container className="add-category-container">
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card className="add-category-card">
                    <CardContent>
                        <div className="card-header">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleBackToDashboard}
                            >
                                Back to Dashboard
                            </Button>
                            <div className="title">Add Category</div>
                        </div>
                        <form className="add-category-form" onSubmit={handleAddCategory}>
                            <TextField
                                label="Category Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} />}
                                className='add-category-button'
                            >
                                {loading ? 'Adding...' : 'Add Category'}
                            </Button>
                        </form>
                        <div className="category-list">
                            <h6>Category List:</h6>
                            <List>
                                {categories.map((category, index) => (
                                    <ListItem key={index} divider>
                                        <ListItemText primary={category} />
                                        <div className="category-actions">
                                            <Tooltip title="Edit" placement="bottom-start" arrow>
                                            <IconButton onClick={() => handleEditCategory(index)}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            </Tooltip>
                                        <Tooltip title="Delete" placement="right-start" arrow>
                                            <IconButton onClick={() => handleDeleteCategory(index)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                        >
                            <Alert
                                onClose={handleCloseSnackbar}
                                severity={snackbarSeverity}
                                sx={{ width: '100%' }}
                            >
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogContent>
                                <MuiTextField
                                    label="Category Name"
                                    variant="outlined"
                                    fullWidth
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    required
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenEditDialog(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdateCategory} color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogContent>
                                Are you sure you want to delete this category?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={confirmDelete} color="error">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AddCategory;
