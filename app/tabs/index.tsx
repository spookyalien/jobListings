import { ScrollView, Text, Image, TouchableOpacity, View, StyleSheet, Button, Modal, SafeAreaView } from "react-native";
import React, { useEffect, useState } from 'react';

export default function Tab() {
	const [jobData, setJobData] = useState([]);
	const [isExpanded, setIsExpanded] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedJob, setSelectedJob] = useState(null);

	function convertHtml(html){
		html = html.replace(/<[^>]+>|&nbsp;/g, '');
		html = html.replace(/&#39;/g, "'")
		html = html.replace(".;", "");
		return html
	}

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
	}

	const handleJobClick = (job) => {
		setSelectedJob(job);
		setModalVisible(true); 
	  };

	useEffect(() => {
		getJobs();
	}, []);
	
	useEffect(() => {
		if (jobData.length > 0) {
		  setIsExpanded(new Array(jobData.length).fill(false));
		}
	  }, [jobData]);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Image style={styles.image} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Palm_Coast_Sunset.jpg/1280px-Palm_Coast_Sunset.jpg'}}/>
			</View>
			{jobData && jobData.length > 0 ? (
				jobData.map((job,index) => (
					<TouchableOpacity onPress={() => handleJobClick(job)} key={index} style={styles.jobCard}>
						<View style={styles.marginSpacing}>
							<Text style={styles.jobTitle}>{job.jobTitle || 'No title available'}</Text>
						</View>
						<View>
							<View style={styles.marginSpacing}>
								<Text style={styles.jobSalary}>Salary:</Text>
								<Text style={styles.jobSalaryValue}>{job.salary || 'Not disclosed'}</Text>
							</View>
							<View style={styles.marginSpacing}>
								<Text style={styles.jobDescriptionLabel}>Job Description:</Text>
								<Text 		
									numberOfLines={isExpanded[index] ? 0 : 3}
									style={styles.jobDescriptionText}>{convertHtml(job.jobDescriptionHtml)}
								</Text>

								<TouchableOpacity 
									style={styles.readMoreButton}
									onPress={() => {
										const newExpanded = [...isExpanded];
										newExpanded[index] = !newExpanded[index];
										setIsExpanded(newExpanded);
									}}>
									<Text style={styles.readMoreText}>{isExpanded[index] ? 'Show Less' : 'Read More...'}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				))
			) : (
				<Text>Loading...</Text>  
			)}
			{selectedJob && (
			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<SafeAreaView style={styles.modalContainer}>
					<ScrollView style={styles.modalContent}>
						<Text style={styles.modalTitle}>{selectedJob.jobTitle}</Text>
						<Text style={styles.modalLabel}>Salary:</Text>
						<Text>{selectedJob.salary}</Text>
						<Text style={styles.modalLabel}>Job Description:</Text>
						<Text style={styles.modalSpacing}>{convertHtml(selectedJob.jobDescriptionHtml)}</Text>
						<Button
							title="Close"
							onPress={() => setModalVisible(false)} 
						/>
					</ScrollView>
				</SafeAreaView>
			</Modal>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5', 
	},
	header: {
		flexDirection: 'row', 
		alignItems: 'center',  
		marginBottom: 16,
		backgroundColor: '#22308a', 
		height: '5%',  
		width: '100%', 
	},
	jobCard: {
		backgroundColor: '#fff',
		marginBottom: 16,
		marginLeft: 16,
		marginRight:16,
		borderRadius: 8,
		padding: 16,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 3 },
		elevation: 3, 
	},
	marginSpacing: {
		marginBottom: 12,
	},
	jobTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#007BFF', 
	},
	jobSalary: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#555', 
	},
	image: {
		width: '100%', 
		height: '100%', 
	},
	jobSalaryValue: {
		fontSize: 16,
		color: '#333',
	},
	jobDescriptionLabel: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#555', 
		marginBottom: 4,
	},
	jobDescriptionText: {
		fontSize: 14,
		color: '#666',
		lineHeight: 21,
	},
	readMoreButton: {
		marginTop: 8,
	},
	readMoreText: {
		color: '#007BFF', 
		fontSize: 14,
	},
	modalSpacing: {
		marginBottom:40,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', 
		margin: 0,
	},
	modalContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		width: '80%',
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	modalLabel: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 10,
	},
});
