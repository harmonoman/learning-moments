import { SearchBar } from "../filters/SearchBar";
import { TopicDropdown } from "../filters/TopicDropdown";

export const PostFilterBar = ({ onTopicChange, setSearchTerm, selectedTopicId }) => {
    return (
        <div className="flex justify-between items-start gap-4 w-full px-4 py-6">
            <TopicDropdown onTopicChange={onTopicChange} selectedTopicId={selectedTopicId} />
            <SearchBar setSearchTerm={setSearchTerm} />
        </div>
    );
};