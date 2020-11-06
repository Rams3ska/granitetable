import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper } from '@material-ui/core';
import '../assets/styles/admin-page.scss';

export default function AdminPage({ api }) {
	const [isLoaded, setLoad] = useState(false);
	const [rows, setRows] = useState([]);
	const [filter, setFilter] = useState({
		approved: false,
	});

	const changeActive = (id) => {
		let tempArray = rows.slice();

		let idx = tempArray.findIndex((value) => value.id === id);

		if (idx !== -1) {
			tempArray[idx].isApproved = !tempArray[idx].isApproved;
			setRows(tempArray);
		}
	};

	const handleChange = (e) => {
		const { name, value, checked } = e.target;
		setFilter((prev) => ({
			...prev,
			[name]: value === 'on' ? checked : value,
		}));
	};

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('access-token'),
			},
			redirect: 'follow',
		};
		fetch(`${api}/order`, requestOptions)
			.then((result) => result.json())
			.then((data) => {
				setRows(data);
			})
			.then(() => {
				setLoad(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [api]);

	return isLoaded ? (
		<div className="admin-root">
			<div className="filter-container">
				<div className="filter-input">
					<span>Завершенные заказы</span>
					<input type="checkbox" name="approved" onChange={handleChange}></input>
				</div>
			</div>
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
								Дата подачи
							</TableCell>
							<TableCell align="left" style={{ fontWeight: 'bold' }}>
								Статус
							</TableCell>
							<TableCell align="left"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => {
							if (row.isApproved === true && filter.approved === false) return;
							return (
								<TableRow key={row.id} style={row.isApproved ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="left">
										{row.firstName} {row.lastName}
									</TableCell>
									<TableCell align="left">{row.phone}</TableCell>
									<TableCell align="left">{row.email}</TableCell>
									<TableCell align="left">{row.comment}</TableCell>
									<TableCell align="left">{row.createDate}</TableCell>
									<TableCell align="center">{row.isApproved ? 'Готово' : 'Не готово'}</TableCell>
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
							);
						})}
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
