import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Tooltip 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './AdminProducts.scss';

const AdminProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        // Simulate fetching products data
        const fetchProducts = async () => {
            const mockProducts = [
                {
                    id: 1,
                    name: 'Product 1',
                    price: 10,
                    weight: '1kg',
                    category: 'Category 1',
                    image: 'https://via.placeholder.com/150',
                    date: '2022-01-01',
                },
                {
                    id: 2,
                    name: 'Product 2',
                    price: 20,
                    weight: '2kg',
                    category: 'Category 2',
                    image: 'https://via.placeholder.com/150',
                    date: '2022-01-02',
                },
                // Add more mock products here
            ];
            setProducts(mockProducts);
            setFilteredProducts(mockProducts);
        };
        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterProducts(e.target.value, category);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        filterProducts(search, e.target.value);
    };

    const filterProducts = (searchTerm, categoryTerm) => {
        let filtered = products;
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (categoryTerm && categoryTerm !== 'All') {
            filtered = filtered.filter(product =>
                product.category === categoryTerm
            );
        }
        setFilteredProducts(filtered);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container className="products-container">
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card className="products-card">
                    <CardContent>
                        <h2 className="card-title">Products</h2>
                        <div className="card-header">
                            <div className="search-filter">
                                <TextField
                                    label="Search by Product Name"
                                    variant="outlined"
                                    value={search}
                                    onChange={handleSearchChange}
                                    className="search-field"
                                />
                            </div>
                            <FormControl className="filter-select">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={category}
                                    onChange={handleCategoryChange}
                                    label="Category"
                                >
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="Category 1">Category 1</MenuItem>
                                    <MenuItem value="Category 2">Category 2</MenuItem>
                                    {/* Add more categories here */}
                                </Select>
                            </FormControl>
                        </div>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredProducts
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <img src={product.image} alt={product.name} className="product-image" />
                                                </TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>${product.price}</TableCell>
                                                <TableCell>{product.weight}</TableCell>
                                                <TableCell>{product.category}</TableCell>
                                                <TableCell>{product.date}</TableCell>
                                                <TableCell>
                                                <Tooltip title="Edit" arrow>
                                                    <IconButton>
                                                        <EditIcon color="primary" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete" arrow>
                                                    <IconButton>
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                                  <Tooltip title="View" arrow>
                                                  <IconButton onClick={() => navigate(`/admin/product-details/${product.id}`)}>
                                                        <VisibilityIcon color="primary" />
                                                    </IconButton>
                                                  </Tooltip>
                                                   
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredProducts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AdminProducts;
