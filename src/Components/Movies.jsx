import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Button,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [data, setData] = useState([]);
  const [addMovie, setAddMovie] = useState({});
  const [add, setAdd] = useState(false);
  const [reload, setReload] = useState(false);
  const [update, setUpdate] = useState(0);
  const [id, setId] = useState('');
  const [enableEdit, setEnableEdit] = useState(false);
  const [edit, setEdit] = useState({});

  ///////////////////////////////////////////////////////////////
  // console.log(data);

  useEffect(() => {
    fetch(`https://great-vibe.herokuapp.com/movies`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, [reload]);
  ///////////////////////////////////////////////////////////////

  const handleChange = e => {
    if (enableEdit === true) {
      setEdit({ ...edit, [e.target.name]: e.target.value });
    } else {
      setAddMovie({ ...addMovie, [e.target.name]: e.target.value });
    }
  };

  ///////////////////////////////////////////////////////////////

  const handleSubmitMovies = (req, id, name) => {
    if (req === 0) {
      fetch(`https://great-vibe.herokuapp.com/movies`, {
        method: 'POST',
        body: JSON.stringify(addMovie),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      alert('Added');
      setAdd(!add);
      setAddMovie({});
    } else if (req === 1) {
      let temp = addMovie;
      if (enableEdit === true) temp = edit;
      fetch(`https://great-vibe.herokuapp.com/movies/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(temp),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      setAdd(!add);
      setAddMovie({});
      alert(`Details Updated Succesfully`);
    } else if (req === 2) {
      fetch(`https://great-vibe.herokuapp.com/movies/${id}`, {
        method: 'DELETE',
      });
      alert(`Movie Deleted`);
    }
    setReload(!reload);
  };

  ///////////////////////////////////////////////////////////////

  const handleSort = () => {
    let temp = [...data];
    setData(temp.sort((a, b) => b.rating - a.rating));
  };

  ///////////////////////////////////////////////////////////////

  const handleEditForm = id => {
    fetch(`https://great-vibe.herokuapp.com/movies/${id}`)
      .then(res => res.json())
      .then(res => setEdit(res))
      .catch(err => console.log(err));

    setEnableEdit(true);
  };

  return (
    <div style={{ width: '99%' }}>
      <div
        style={{
          width: '100%',
          height: '80px',
          display: 'grid',
          placeItems: 'center',
          margin: 'auto',
          backgroundColor: '#3F4E4F',
          borderRadius: '10px',
        }}
      >
        <Heading>
          <span style={{ fontFamily: 'Georgia, serif', color: 'white' }}>
            <Link to={'/'}>Great Vibes Movie App</Link>
          </span>{' '}
          <Button
            onClick={() => {
              setAdd(!add);
              setUpdate(0);
            }}
            style={{ marginLeft: '200px' }}
          >
            {add ? 'Cancel' : 'Add Movie'}
          </Button>
          <Button ml={15} onClick={handleSort}>
            Sort By Rating
          </Button>
        </Heading>
      </div>
      <br />

      {add ? (
        <Container>
          <Heading>Enter Movie Details</Heading>
          <form action="">
            <label> Title :</label>
            <Input
              variant="filled"
              placeholder="Movie Title"
              value={
                edit.movie_name === '' ? addMovie.movie_name : edit.movie_name
              }
              name="movie_name"
              onChange={e => handleChange(e)}
            />
            <label> Rating :</label>
            <Input
              type={Number}
              variant="filled"
              placeholder="Rating"
              value={edit.rating === '' ? addMovie.rating : edit.rating}
              name="rating"
              onChange={e => handleChange(e)}
            />
            <label> Genre :</label>
            <Input
              variant="filled"
              placeholder="Genre"
              value={edit.genre === '' ? addMovie.genre : edit.genre}
              name="genre"
              onChange={e => handleChange(e)}
            />
            <label> Cast :</label>
            <Input
              variant="filled"
              placeholder="Cast Details"
              value={edit.cast === '' ? addMovie.cast : edit.cast}
              name="cast"
              onChange={e => handleChange(e)}
            />
            <label> Release Date :</label>
            <Input
              type={'date'}
              variant="filled"
              value={edit.date === '' ? addMovie.date : edit.date}
              name="release_date"
              onChange={e => handleChange(e)}
            />
            <br />
            <br />
            <Button
              onClick={() => {
                update === 0
                  ? handleSubmitMovies(0)
                  : handleSubmitMovies(1, id);
              }}
            >
              Submit
            </Button>
          </form>
          {/* ////////////////// */}
        </Container>
      ) : (
        <TableContainer w={'95%'} m="auto" border="1px solid black">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                {/* <Th>Poster</Th> */}
                <Th style={{ width: '100px' }}>Title</Th>
                <Th>Rating</Th>
                <Th>Release Date</Th>
                <Th>Cast</Th>
                <Th>Genre</Th>
                <Th>To Edit</Th>
                <Th>To Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((e, i) => (
                <Tr key={e._id}>
                  <Td>{i + 1 + '.'}</Td>
                  {/* <Th>Img</Th> */}
                  <Th>{e.movie_name}</Th>
                  <Th>{e.rating}</Th>
                  <Th>{e.release_date}</Th>
                  <Th>{e.cast[0]}</Th>
                  <Th>{e.genre}</Th>
                  <Td>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      onClick={() => {
                        handleEditForm(e._id);
                        setAdd(true);
                        setUpdate(1);
                        setId(e._id);
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      onClick={() => handleSubmitMovies(2, e._id, e.name)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <br />
    </div>
  );
};

export default Movies;
