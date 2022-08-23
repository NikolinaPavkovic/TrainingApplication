package com.thesis.trainingapp.service;

import com.thesis.trainingapp.dto.MembershipDTO;
import com.thesis.trainingapp.model.Benefit;
import com.thesis.trainingapp.model.Membership;
import com.thesis.trainingapp.repository.BenefitRepository;
import com.thesis.trainingapp.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MembershipServiceImpl implements MembershipService{
    private final MembershipRepository membershipRepository;
    private final BenefitRepository benefitRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public Membership saveMembreship(MembershipDTO dto) {
        if(dto.getBenefits().length != 0) saveBenefits(dto.getBenefits());
        Membership membership = modelMapper.map(dto, Membership.class);
        membership.setBenefits(setMembershipBenefits(dto));
        return membershipRepository.save(membership);
    }

    private List<Benefit> setMembershipBenefits(MembershipDTO dto) {
        List<Benefit> benefits = new ArrayList<>();
        for (String benefit : dto.getBenefits()) {
            benefits.add(benefitRepository.findByName(benefit));
        }
        return benefits;
    }

    private void saveBenefits(String[] benefits){
        for (String benefit : benefits) {
            if(benefitRepository.findByName(benefit) != null) continue;
            System.out.println("UPISUJE:" + benefit);
            benefitRepository.save(new Benefit(null, benefit));
        }
    }

    @Override
    public List<Membership> getMemberships() {
        return membershipRepository.findAll();
    }
}
