import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, Button } from 'react-bootstrap';
import { urlFindData } from './constants';

function App() {

  const [selectedFile, setSelectedFile] = useState('');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(urlFindData);
      const data = await response.json();
      const allData = [];
      data.forEach((element) => {
        if (element.lines.length > 0) {
          element.lines.forEach((item) => {
            allData.push({
              file: element.file,
              text: item.text || '',
              number: item.number || '',
              hex: item.hex || '',
            });
          });
        }
      });
      setAllData(allData);
      setFilteredData(allData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const fileNames = [...new Set(allData.map(({ file }) => file))];

  const handleSearch = () => {
    const newData = selectedFile ? allData.filter(({ file }) => file === selectedFile) : allData;
    setFilteredData(newData);
  };

  const handleReset = () => {
    setSelectedFile('');
    setFilteredData(allData);
  };

  return (
    <div id={'app-container'} className="container">
      <Form>
        <Form.Group controlId="formBasicSelect">
          <Form.Label>Filter by file name</Form.Label>
          <Form.Control
            as="select"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            <option value="">Select a file...</option>
            {fileNames.map((fileName) => (
              <option key={fileName} value={fileName}>
                {fileName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <div style={{ marginTop: 5 }}>
          <Button variant="primary" onClick={handleSearch} disabled={!selectedFile}>
            Search
          </Button>{' '}
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
      <br />
      <Table data-testid="table" striped bordered>
        <thead>
          <tr>
            <th>File name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ file, text, number, hex }, index) => (
            <tr key={index}>
              <td>{file}</td>
              <td>{text}</td>
              <td>{number}</td>
              <td>{hex}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
