import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from 'react';

export default function Index() {
	const [jobData, setJobData] = useState([]);
	async function getJobs() {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}`)
		.then(function(response){
			return response.json();
		})
		.then(function(jobs) {
			setJobData(jobs.data || []);
		})
		.catch(function(err) {
			console.log("[!] Error fetching");
		});
	useEffect(() => {
		getJobs();
	  }, []);

	return (
	);
	}
