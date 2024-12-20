import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileJson, FileCode, FileText, Folder } from 'lucide-react';
import { FileItem } from '../types';
import { clsx } from 'clsx';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

interface fileNodeProps {
  item: FileItem;
  depth: number;
  onFileSelect: (file: FileItem) => void;
}

const FileNode: React.FC<fileNodeProps> = ({ item, depth, onFileSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.json')) return <FileJson className="w-4 h-4 text-notion-dimmed" />;
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) return <FileCode className="w-4 h-4 text-notion-dimmed" />;
    return <FileText className="w-4 h-4 text-notion-dimmed" />;
  };

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(item);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          "flex items-center py-1 px-2 rounded cursor-pointer text-notion-text hover:bg-notion-subtle transition-colors",
          "select-none"
        )}
        style={{ paddingLeft: `${depth * 1.2}rem` }}
        onClick={handleClick}
      >
        {item.type === 'folder' && (
          <span className="mr-1">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-notion-dimmed" />
            ) : (
              <ChevronRight className="w-4 h-4 text-notion-dimmed" />
            )}
          </span>
        )}
        {item.type === 'folder' ? (
          <Folder className="w-4 h-4 text-notion-dimmed mr-2" />
        ) : (
          <span className="mr-2">{getFileIcon(item.name)}</span>
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileNode
              key={`${child.name}-${index}`}
              item={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect }) => {
  return (
    <div className="bg-notion-default rounded-lg">
      <h3 className="font-medium px-4 py-3 text-notion-text border-b border-notion-border">
        Explorer
      </h3>
      <div className="py-2">
        {files.map((file, index) => (
          <FileNode
            key={`${file.name}-${index}`}
            item={file}
            depth={1}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </div>
  );
};