import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/topicService";

export const TopicDropdown = ({ onTopicChange }) => {
    const [allTopics, setAllTopics] = useState([]);

    // Get all topics
    useEffect(() => {
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray);
        })
    }, []);

    return (
        <div className="mb-6">
          <select 
            className="h-10 px-3 border-2 border-[#CC5500] rounded"
            onChange={(e => onTopicChange(parseInt(e.target.value)) )}
          >
            <option value={0}>All Topics</option>
            {allTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
      );
}