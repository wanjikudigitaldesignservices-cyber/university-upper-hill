import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { HostelRoom, HostelBooking } from '../../types';
import {
  Home,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldCheck,
  Building,
  Lock,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { JiungePaymentModal } from '../../components/JiungePaymentModal';

export const HostelBookingPage: React.FC = () => {
  const [rooms, setRooms] = useState<HostelRoom[]>([]);
  const [myBookings, setMyBookings] = useState<HostelBooking[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [payModalOpen, setPayModalOpen] = useState(false);

  const loadData = async () => {
    try {
      const allRooms = await api.getHostelRooms();
      const bookings = await api.getMyBookings();
      setRooms(allRooms);
      setMyBookings(bookings);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBookRoom = async (roomId: string) => {
    setLoading(true);
    setMessage(null);
    try {
      // Calls Layer 8 concurrency booking logic
      const booking = await api.bookHostelRoom(roomId);
      setMessage({
        text: `Success! Room ${booking.room_number} in ${booking.block_name} has been reserved for you.`,
        type: 'success',
      });
      loadData();
    } catch (err: any) {
      setMessage({
        text: err.message || 'Room booking failed. Please try another unit.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const blocks = ['All', 'Block A (Men)', 'Block B (Women)', 'Block C (Executive)', 'Block D (Postgrad)'];

  const filteredRooms = selectedBlock === 'All'
    ? rooms
    : rooms.filter((r) => r.block_name === selectedBlock);

  const activeBooking = myBookings.find((b) => b.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider">
              Layer 8 Microservice
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Row-Level Concurrency Lock</span>
          </div>
          <h2 className="text-xl font-bold text-navy-950 mt-1">Hostel Room Allocation Portal</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time room occupancy state with automatic fee clearance validation before booking.
          </p>
        </div>

        {activeBooking && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Allocated: {activeBooking.block_name}</p>
              <p className="text-[11px] text-emerald-700">Room #{activeBooking.room_number} • Semester 1 Valid</p>
            </div>
          </div>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-2xl text-xs flex items-center justify-between ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
          {message.type === 'error' && message.text.includes('Fee Clearance') && (
            <button
              onClick={() => setPayModalOpen(true)}
              className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-xs shadow-sm transition"
            >
              Clear Fees via Jiunge
            </button>
          )}
        </div>
      )}

      {/* Block Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {blocks.map((block) => (
          <button
            key={block}
            onClick={() => setSelectedBlock(block)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
              selectedBlock === block
                ? 'bg-navy-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {block}
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const isFull = room.occupancy >= room.capacity || room.status === 'full';
          const isMyRoom = activeBooking?.room_id === room.id;
          const percentage = (room.occupancy / room.capacity) * 100;

          return (
            <div
              key={room.id}
              className={`p-6 rounded-3xl border transition flex flex-col justify-between space-y-5 ${
                isMyRoom
                  ? 'bg-brand-50/50 border-brand-500 shadow-md ring-2 ring-brand-400/30'
                  : isFull
                  ? 'bg-slate-50 border-slate-200 opacity-75'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{room.block_name}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isMyRoom
                        ? 'bg-brand-500 text-white'
                        : isFull
                        ? 'bg-red-100 text-red-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isMyRoom ? 'Your Allocation' : isFull ? 'Full' : 'Available'}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-navy-950 font-mono">Room {room.room_number}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Capacity: {room.capacity} Bed Spaces</p>
                </div>

                {/* Occupancy Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                    <span>Occupancy</span>
                    <span>{room.occupancy} / {room.capacity} Occupied</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isFull ? 'bg-red-500' : room.occupancy > 0 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100">
                {isMyRoom ? (
                  <div className="w-full py-2.5 bg-brand-100 text-brand-800 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Allocated to You</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleBookRoom(room.id)}
                    disabled={isFull || loading || !!activeBooking}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                      isFull
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : activeBooking
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-navy-900 hover:bg-navy-800 text-white shadow-md hover:shadow-navy-900/20'
                    }`}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isFull ? (
                      <span>Room Full</span>
                    ) : activeBooking ? (
                      <span>Allocation Limit Reached</span>
                    ) : (
                      <span>Book Room (Instant Lock)</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <JiungePaymentModal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        onSuccess={() => {
          setPayModalOpen(false);
          loadData();
        }}
        defaultAmount={6500}
        description="Hostel Accommodation Fee Clearance"
      />
    </div>
  );
};
