import { create } from 'zustand';

type DataPoint = {
  timestamp: number;
  value: number;
};

type WebSocketState = {
  data: DataPoint[];
  addData: (point: DataPoint) => void;
};

export const useWebSocketStore = create<WebSocketState>((set) => ({
  data: [],
  addData: (point) =>
    set((state) => ({
      data: [...state.data.slice(-29), point], // максимум 30 точек
    })),
}));