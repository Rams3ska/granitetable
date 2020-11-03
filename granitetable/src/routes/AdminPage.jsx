import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper } from '@material-ui/core';
import '../assets/styles/admin-page.scss';

export default function AdminPage(props) {
	const [isLoaded, setLoad] = useState(false);
	const [rows, setRows] = useState([]);

	const changeActive = (id) => {
		let tempArray = rows.slice();

		let idx = tempArray.findIndex((value) => value.id === id);

		if (idx !== -1) {
			tempArray[idx].status = !tempArray[idx].status;
			setRows(tempArray);
		}
	};

	useEffect(() => {
		fetch('http://www.json-generator.com/api/json/get/cfLpVgrBLm?indent=2')
			.then((result) => result.json())
			.then((data) => {
				// data.splice(10, 90);
				setRows(data);
			})
			.then(() => {
				setLoad(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return isLoaded ? (
		<div className="admin-root">
			<TableContainer component={Paper}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
							<TableCell align="left" style={{ fontWeight: 'bold' }}>
								Имя/Фамилия
							</TableCell>
							<TableCell align="left" style={{ fontWeight: 'bold' }}>
								Номер телефона
							</TableCell>
							<TableCell align="left" style={{ fontWeight: 'bold' }}>
								Почтовый адрес
							</TableCell>
							<TableCell align="left" style={{ fontWeight: 'bold' }}>
								Пожелание клиента
							</TableCell>
							<TableCell align="left" style={{ fontWeight: 'bold' }}>
								Статус
							</TableCell>
							<TableCell align="left"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.id} style={row.status ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
								<TableCell component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell align="left">{row.name}</TableCell>
								<TableCell align="left">{row.phone}</TableCell>
								<TableCell align="left">{row.email}</TableCell>
								<TableCell align="left">{row.comment}</TableCell>
								<TableCell align="center">{row.status ? 'Готово' : 'Не готово'}</TableCell>
								<TableCell align="center">
									<input
										type="button"
										value="&#9745;"
										className="approve"
										onClick={() => {
											changeActive(row.id);
										}}
									></input>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	) : (
		<div className="admin-root">
			<Loader />
		</div>
	);
}
