import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Props {
  onDelete?: () => void;
  onAdd?: () => void;
  selectedRowKeys: string[];
}

const ActionPanel: React.FC<Props> = function ({
  selectedRowKeys,
  onDelete,
  onAdd,
}) {
  const isShowPanel = onDelete || onAdd;
  const disabled = selectedRowKeys.length <= 0;

  return isShowPanel ? (
    <div className="table-action-panel">
      {onAdd && (
        <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>
          Create
        </Button>
      )}

      {onDelete && (
        <Popconfirm
          title="Are you sure want to delete?"
          onConfirm={onDelete}
          placement="bottomLeft"
          okType="danger"
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            danger
            disabled={disabled}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      )}
    </div>
  ) : null;
};

export default ActionPanel;
