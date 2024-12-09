import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from 'react';

export default function Index() {
	const [jobData, setJobData] = useState([]);
	const [isExpanded, setIsExpanded] = useState([]);

	function convertToPlain(html){
		var tempDivElement = document.createElement("div");
		tempDivElement.innerHTML = html;
		return tempDivElement.textContent || tempDivElement.innerText || "";
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

	useEffect(() => {
		getJobs();
	  }, []);

	  useEffect(() => {
		if (jobData.length > 0) {
		  setIsExpanded(new Array(jobData.length).fill(false));
		}
	  }, [jobData]);

	return (
		<ScrollView
		style={{
		}}
		>
		{jobData && jobData.length > 0 ? (
			jobData.map((job,index) => (
				<View key={index}>
					<View>
						<Text>{job.jobTitle || 'No title available'}</Text>
					</View>
					<View>
						<View>
							<Text>Salary:</Text>
							<Text>{job.salary || 'Not disclosed'}</Text>
						</View>
						<View>
							<Text>Job Description:</Text>
							<Text 
							
							numberOfLines={isExpanded[index] ? 0 : 3}
							style={{ lineHeight: 21 }}>{convertToPlain(job.jobDescriptionHtml)}</Text>

							<TouchableOpacity onPress={() => {
								const newExpanded = [...isExpanded];
								newExpanded[index] = !newExpanded[index];
								setIsExpanded(newExpanded);
                			}}>
                  				<Text>{isExpanded[index] ? 'Show Less' : 'Read More...'}</Text>
                			</TouchableOpacity>
						</View>
					</View>
          		</View>
			))
		) : (
			<Text>Loading...</Text>  
		)}
		</ScrollView>
	);
	}
