import { SearchBar } from "../filters/SearchBar";
import { TopicDropdown } from "../filters/TopicDropdown";

export const PostFilterBar = ({ onTopicChange, setSearchTerm, lastTopic }) => {
    
    // Handling of search term change
    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
        if (term === "") {
            // Restore last selected topic, but don’t update it
            onTopicChange(lastTopic, true);
        } else {
            // Search all topics, don’t update lastTopic
            onTopicChange(0, true);
        }
    };

    return (
        <div className="flex justify-between items-start gap-4 w-full px-4 py-6">
            <TopicDropdown onTopicChange={onTopicChange} />
            <SearchBar setSearchTerm={handleSearchTermChange} />
        </div>
    );
}