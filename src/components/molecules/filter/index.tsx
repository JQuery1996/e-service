import { FC } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from "@mui/material";
import '../../../assets/css/filter.css';

export interface ServicesFilterProps {}

export const ServicesFilter: FC<ServicesFilterProps> = () => {
  //Hooks

  return (
    <Box className="filtering-container">
     
      <Box className="all-filters-container">
        <Box className="filter-container">
          <FormControl fullWidth>
          <InputLabel id="cat-label">الفئة</InputLabel>
            <Select
              labelId="cat-label"
              id="category"
              value=""
              label="خدمات"
            >
              <MenuItem value={10}>خدمات</MenuItem>
              <MenuItem value={20}>أغذية</MenuItem>
              <MenuItem value={30}>أدوية</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="filter-container" sx={{mr:2, ml:2}}>
          <FormControl fullWidth>
          <InputLabel id="price-label">السعر</InputLabel>
            <Select
              labelId="price-label"
              id="price"
              value=""
              label="السعر"
            >
              <MenuItem value={10}>100</MenuItem>
              <MenuItem value={20}>1000</MenuItem>
              <MenuItem value={30}>10000</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="filter-container">
          <FormControl fullWidth>
          <InputLabel id="delivery-label">مدة التوصيل</InputLabel>
            <Select
              labelId="delivery-label"
              id="delivery"
              value=""
              label="مدة التوصيل"
            >
              <MenuItem value={10}>ساعة</MenuItem>
              <MenuItem value={20}>يوم</MenuItem>
              <MenuItem value={30}>شهر</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className="all-sort-container">
        <Box className="sort-container">
          <FormControl variant="standard" sx={{ minWidth: 120, ml:1 }}>
          <InputLabel id="sort-label">ترتيب حسب</InputLabel>
            <Select
              labelId="sort-label"
              id="sort"
              value=""
              label="ترتيب حسب"
            >            
              <MenuItem value={10}>الجديد</MenuItem>
              <MenuItem value={20}>القديم</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
    
  );
};
