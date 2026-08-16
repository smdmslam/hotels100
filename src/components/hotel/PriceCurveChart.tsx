import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
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

  // Format date for display in tooltip
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipDate}>{point.tenor ? `${point.tenor} (${formatDate(point.date)})` : formatDate(point.date)}</p>
          <p className={styles.tooltipRate}>
            {pricing.currency} {point.rate}
          </p>
          {point.notes && <p className={styles.tooltipNotes}>{point.notes}</p>}
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (tickItem: any) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short' }); // e.g., 'Sep', 'Nov'
  };

  // We should sort the data points chronologically to ensure they draw left-to-right
  const sortedData = [...pricing.dataPoints].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
          <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(18, 18, 18, 0.1)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis} 
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
              stroke="#121212" 
              strokeWidth={2}
              connectNulls={true}
              dot={{ r: 4, fill: '#121212', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#B39A62' }}
            />
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
