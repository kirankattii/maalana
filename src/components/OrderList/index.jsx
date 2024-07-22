import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    TablePagination,
    Select,
    MenuItem as SelectMenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './OrderList.scss';

const statusStyles = {
    Pending: { color: 'orange' },
    Shipped: { color: 'blue' },
    Delivered: { color: 'green' },
};

const OrderList = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        productName: '',
        qty: '',
        weight: '',
        price: '',
        date: '',
        status: '',
        paymentMethod: '',
    });
    const [productDetails, setProductDetails] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    const [orderData, setOrderData] = useState([
        {
            productId: '1',
            productName: 'Product 1',
            qty: 2,
            price: '₹20.00',
            date: '2024-07-10',
            status: 'Pending',
            imageUrl: 'https://via.placeholder.com/100',
            paymentMethod: 'Paid',
            weight: '250gm',
        },
        {
            productId: '2',
            productName: 'Product 2',
            qty: 1,
            price: '₹15.00',
            date: '2024-07-12',
            status: 'Shipped',
            imageUrl: 'https://via.placeholder.com/100',
            paymentMethod: 'cash on delivery',
            weight: '250gm',
        },
        // Add more orders as needed
    ]);

    console.log(selectedOrder);
    const handleClick = (event, order) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrder(order);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedOrder(null);
    };

    const handleEdit = () => {
        setEditFormData(selectedOrder);
        setEditDialogOpen(true);
        handleClose();
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
    };


    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleEditSubmit = () => {
        setOrderData(prevData =>
            prevData.map(order =>
                order === selectedOrder ? { ...selectedOrder, ...editFormData } : order
            )
        );
        setEditDialogOpen(false);
    };

    const handleDeleteOpen = () => {
        setDeleteDialogOpen(true);
        handleClose();
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDelete = () => {
        setOrderData(prevData => prevData.filter(order => order !== selectedOrder));
        setDeleteDialogOpen(false);
    };

    const handleViewOpen = () => {
        setViewDialogOpen(true);
        setProductDetails(selectedOrder);
        handleClose();
        navigate(`/admin/order-details/${selectedOrder.productId}`);
    };

    const handleViewClose = () => {
        setViewDialogOpen(false);

    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };


    const filteredOrders = orderData.filter(order =>
        (filterStatus === 'All' || order.status === filterStatus) &&
        (order.productName.toLowerCase().includes(searchText.toLowerCase()))
    );

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    };
    console.log('productDetails', productDetails.productName);

    return (
        <Grid item xs={12}>
            <Card className="dashboard-card">
                <CardContent>
                    <Typography variant="h6" className="dashboard-title">Order List</Typography>
                    <div className="search-filter">
                        <TextField
                            label="Search by Product Name"
                            variant="outlined"
                            size="small"
                            value={searchText}
                            onChange={handleSearchChange}
                            className="search-field"
                        />
                        <Select
                            value={filterStatus}
                            onChange={handleFilterChange}
                            displayEmpty
                            className="filter-dropdown"
                        >
                            <SelectMenuItem value="All">All</SelectMenuItem>
                            <SelectMenuItem value="Pending">Pending</SelectMenuItem>
                            <SelectMenuItem value="Shipped">Shipped</SelectMenuItem>
                            <SelectMenuItem value="Delivered">Delivered</SelectMenuItem>
                        </Select>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Image</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Weight</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <img src={order.imageUrl} alt={order.productName} className="product-image" />
                                    </TableCell>
                                    <TableCell>{order.productName ? order.productName : 'N/A'}</TableCell>
                                    <TableCell>{order.qty ? order.qty : 'N/A'}</TableCell>
                                    <TableCell>{order.weight ? order.weight : 'N/A'}</TableCell>
                                    <TableCell>{order.price ? order.price : 'N/A'}</TableCell>
                                    <TableCell>{order.date ? order.date : 'N/A'}</TableCell>
                                    <TableCell style={statusStyles[order.status]}>
                                        {order.status ? order.status : 'N/A'}
                                    </TableCell>
                                    <TableCell>{order.paymentMethod ? order.paymentMethod : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Tooltip title="More" arrow>
                                        <IconButton onClick={(event) => handleClick(event, order)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredOrders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >       
                     <Tooltip title="Edit" placement="right-start" arrow>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                        <MenuItem onClick={handleEdit}>
                            <EditIcon />
                        </MenuItem>
                        </Tooltip>
                        <Tooltip title="Delete" placement="right-start" arrow>
                        <MenuItem onClick={handleDeleteOpen}>
                            <DeleteIcon />
                        </MenuItem>
                        </Tooltip>
                        <Tooltip title="View Details" placement="right-start" arrow>
                        <MenuItem onClick={handleViewOpen}>
                            <VisibilityIcon />
                        </MenuItem>
                        </Tooltip>
                    </Menu>
                </CardContent>
            </Card>

            <Dialog open={viewDialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        View and review the details of this order.
                    </DialogContentText>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <img
                            src={imageFile ? URL.createObjectURL(imageFile) : productDetails.imageUrl}
                            alt={orderData.productName}
                            style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '20px' }}
                        />
                        <Typography variant="h6">{orderData.productName}</Typography>
                    </div>
                    <TextField
                        margin="dense"
                        label="Product Name"
                        type="text"
                        fullWidth
                        value={productDetails.productName ? productDetails.productName : 'N/A'}
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={productDetails.qty ? productDetails.qty : 'N/A'}
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                    <TextField
                        margin="dense"
                        label="Weight"
                        type="text"
                        fullWidth
                        value={productDetails.weight ? productDetails.weight : 'N/A'}
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="text"
                        fullWidth
                        value={productDetails.price ? productDetails.price : 'N/A'}
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        value={productDetails.date ? productDetails.date : 'N/A'}
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        disabled
                    />
                    <Select
                        label="Status"
                        fullWidth
                        value={productDetails.status ? productDetails.status : 'N/A'}
                        InputProps={{ readOnly: true }}
                        margin="dense"
                        disabled
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                    <TextField
                        margin="dense"
                        label="Payment Method"
                        type="text"
                        fullWidth
                        value={productDetails.paymentMethod ? productDetails.paymentMethod : 'N/A'}
                        InputProps={{ readOnly: true }}
                        disabled
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleViewClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editDialogOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Modify the details of the order.
                    </DialogContentText>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={imageFile ? URL.createObjectURL(imageFile) : editFormData.imageUrl}
                            alt="Order"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '15px 20px 15px 0px' }}
                        />
                        <Button variant="outlined" component="label">
                            Replace Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                    </div>
                    <TextField
                        margin="dense"
                        label="Product Name"
                        type="text"
                        fullWidth
                        name="productName"
                        value={editFormData.productName}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        name="qty"
                        value={editFormData.qty}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Weight"
                        type="text"
                        fullWidth
                        name="weight"
                        value={editFormData.weight}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="text"
                        fullWidth
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        name="date"
                        value={editFormData.date}
                        onChange={handleEditChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Select
                        label="Status"
                        fullWidth
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditChange}
                        margin="dense"
                    >
                        <SelectMenuItem value="Pending">Pending</SelectMenuItem>
                        <SelectMenuItem value="Shipped">Shipped</SelectMenuItem>
                        <SelectMenuItem value="Delivered">Delivered</SelectMenuItem>
                    </Select>
                    <TextField
                        margin="dense"
                        label="Payment Method"
                        type="text"
                        fullWidth
                        name="paymentMethod"
                        value={editFormData.paymentMethod}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this order? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default OrderList;
