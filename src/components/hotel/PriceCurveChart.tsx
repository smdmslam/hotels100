import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';
import type { PricingIntelligence } from '../../data/types';
import styles from './PriceCurveChart.module.css';

interface PriceCurveChartProps {
  pricing: PricingIntelligence;
}

export const PriceCurveChart: React.FC<PriceCurveChartProps> = ({ pricing }) => {
  if (pricing.status !== 'complete' || !pricing.dataPoints || pricing.dataPoints.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Pricing intelligence collection is {pricing.status === 'collecting' ? 'in progress' : 'not started'} for this property.</p>
        {pricing.dmwInterpretation && <p className={styles.interpretation}>{pricing.dmwInterpretation}</p>}
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipDate}>{formatDate(point.date)}</p>
          <p className={styles.tooltipRate}>
            {pricing.currency} {point.rate}
          </p>
          {point.notes && <p className={styles.tooltipNotes}>{point.notes}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartHeader}>
        <div className={styles.chartMeta}>
          <span className={styles.metaLabel}>Basis</span>
          <span className={styles.metaValue}>{pricing.roomBasis || 'Standard Room'}</span>
        </div>
        <div className={styles.chartMeta}>
          <span className={styles.metaLabel}>Median Rate</span>
          <span className={styles.metaValue}>{pricing.currency} {pricing.medianObservedRate}</span>
        </div>
        <div className={styles.chartMeta}>
          <span className={styles.metaLabel}>Highest Rate</span>
          <span className={styles.metaValue}>{pricing.currency} {pricing.highestObservedRate}</span>
        </div>
      </div>
      
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={pricing.dataPoints} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(18, 18, 18, 0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#777C70' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#777C70' }}
              tickFormatter={(val) => `${val}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#B39A62" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#B39A62', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#121212' }}
            />
            {/* Map event markers if they exist */}
            {pricing.eventMarkers && pricing.eventMarkers.map((marker, idx) => {
              const point = pricing.dataPoints.find(p => p.date === marker.date);
              if (point) {
                return (
                  <ReferenceDot 
                    key={idx} 
                    x={marker.date} 
                    y={point.rate} 
                    r={6} 
                    fill="#6D292F" 
                    stroke="none"
                  />
                );
              }
              return null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {pricing.dmwInterpretation && (
        <div className={styles.interpretation}>
          <h4>DMW Interpretation</h4>
          <p>{pricing.dmwInterpretation}</p>
        </div>
      )}
    </div>
  );
};
