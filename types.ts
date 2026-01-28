
export type WorkflowStatus = 'todo' | 'in-progress' | 'completed' | 'blocked';

export interface WorkflowNode {
  id: string;
  title: string;
  description: string;
  type: 'planning' | 'development' | 'testing' | 'review' | 'deployment';
  status: WorkflowStatus;
  owner?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Lead' | 'Maintainer' | 'Contributor';
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
}

export interface AIResponse {
  suggestion: string;
  suggestedNodes: WorkflowNode[];
}
