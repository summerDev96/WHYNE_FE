import { Badge } from '@/components/ui/badge';

export default function badges() {
  return (
    <div style={{ marginBottom: '30px', marginLeft: '20px' }}>
      variant : chooseFlavor(기본값)
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <Badge>체리</Badge>
        <Badge>베리</Badge>
        <Badge>바닐라</Badge>
        <Badge>후추</Badge>
        <Badge>흙</Badge>
      </div>
      variant : chooseWineType
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <Badge variant='chooseWineType'>Red</Badge>
        <Badge variant='chooseWineType'>White</Badge>
        <Badge variant='chooseWineType'>Sparking</Badge>
      </div>
      variant : priceBadge
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <Badge variant='priceBadge'>$20000</Badge>
      </div>
      variant : flavor
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <Badge variant='flavor'>체리</Badge>
        <Badge variant='flavor'>오크</Badge>
        <Badge variant='flavor'>꽃</Badge>
        <Badge variant='flavor'>카라멜</Badge>
      </div>
      variant : star
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <Badge variant='star'>★5.0</Badge>
      </div>
      variant : taste
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <Badge variant='taste'>바디감</Badge>
        <Badge variant='taste'>타닌</Badge>
        <Badge variant='taste'>당도</Badge>
        <Badge variant='taste'>산미</Badge>
      </div>
      <input type='checkbox' id='id' />
      <Badge htmlFor='id'>123</Badge>
    </div>
  );
}
