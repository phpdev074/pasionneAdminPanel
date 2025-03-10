import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [order] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage] = useState(10);

  const getUsersData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await axios.get(`https://pasionneapi.codingacademy.world/api/user/get-all-user-data`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("===>>>resposne",response?.data?.data?.users)
      setUserData(response?.data?.data?.users || []);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleFilterByName = (event) => {
    setPage(1);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  const totalPages = Math.ceil(dataFiltered.length / rowsPerPage);

  const emptyRowCount =
    rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - (page - 1) * rowsPerPage);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={userData.length}
                numSelected={selected.length}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'gender', label: 'Gender'},
                  { id: 'mobile', label: 'Mobile Number' },
                  { id: 'viewDetails', label: 'View Details'},
                  { id: 'action', label: 'Action' },
                ]}
              />
              <TableBody>
                {dataFiltered.length > 0 ? (
                  dataFiltered
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row._id}
                        name={row.name}
                        mobileNumber={row.mobileNumber}
                        status={row.status}
                        gender={row.gender}
                        email={row.email}
                        dob={row.DOB}
                        addInterestAge={row.addInterestAge}
                        artsAndCrafts={row.artsAndCrafts}
                        addInterestHeight={row.addInterestHeight}
                        addInterestLocation={row.addInterestLocation}
                        blockedBy={row.blockedBy}
                        cookingAndBaking={row.cookingAndBaking}
                        dance={row.dance}
                        education={row.education}
                        englishLanguages={row.englishLanguages}
                        ethnicity={row.ethnicity}
                        eyeColor={row.eyeColor}
                        faithInterest={row.faithInterest}
                        filmTV={row.filmTV}
                        frenchLanguages={row.frenchLanguages}
                        fromAgeInterest={row.fromAgeInterest}
                        gaming={row.gaming}
                        germanLanguages={row.germanLanguages}
                        hairColor={row.hairColor}
                        hairLength={row.hairLength}
                        height={row.height}
                        history={row.history}
                        hobbies={row.hobbies}
                        intellectualPursuit={row.intellectualPursuit}
                        interests={row.interests}
                        isBlocked={row.isBlocked}
                        isDeleted={row.isDeleted}
                        languageLearning={row.languageLearning}
                        likes={row.likes}
                        listeningMusic={row.listeningMusic}
                        literature={row.literature}
                        locationName={row.locationName}
                        lookingFor={row.lookingFor}
                        lookingForEthnicity={row.lookingForEthnicity}
                        maritalStatus={row.maritalStatus}
                        otherLanguages={row.otherLanguages}
                        personalityMessage={row.personalityMessage}
                        philosophy={row.philosophy}
                        primaryLanguages={row.primaryLanguages}
                        psychology={row.psychology}
                        russianLanguage={row.russianLanguage}
                        shortDescription={row.shortDescription}
                        socialLifeStyle={row.socialLifeStyle}
                        spanishLanguages={row.spanishLanguages}
                        sportsFitness={row.sportsFitness}
                        toAgeInterest={row.toAgeInterest}
                        userProfileImages={row.userProfileImages}
                        _id={row._id}
                        avatarUrl={row.profileImage}
                        userType={row.userType}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <div style={{ marginTop: '10%', fontWeight: 'bold' }}>No Data Found</div>
                    </TableCell>
                  </TableRow>
                )}

                <TableEmptyRows height={77} emptyRows={emptyRowCount} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" mt={2} mb={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </Card>
    </Container>
  );
}
